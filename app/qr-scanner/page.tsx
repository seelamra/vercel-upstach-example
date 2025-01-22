'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function Scanner() {
  const router = useRouter(); // Initialize useRouter
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');

    if (!storedUserData) {
      // If userData is not found in sessionStorage, redirect to login page
      router.push('/');
    } else {
      setUserData(storedUserData); // Set userData from sessionStorage
    }
    setLoading(false);
  }, [router]); // Run on component mount

  // If still loading or userData is not set, render nothing or a loader
  if (loading || Object.keys(userData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <QRScanner />
    </div>
  );
}

function QRScanner() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerStopped, setScannerStopped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<BrowserMultiFormatReader | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [formUrl, setFormUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    const storedUserEmail = sessionStorage.getItem('userEmail');

    if (storedUserData && storedUserEmail) {
      const email = storedUserEmail.toString();
      const userFirstName = storedUserData.toString().split(" ")[0];
      const userLastName = storedUserData.toString().split(" ")[1];
      const newUserData = {
        r1e584eb2cfd743abad332dada96f06fd: userFirstName || '',
        ra1042737eb9b44a3a80e11071bec9387: userLastName || '',
        raef477d0791c4180911a179e85e61004: email || '',
      };
      setUserData(newUserData);
      sessionStorage.setItem('userDatascanner', JSON.stringify(newUserData)); // Store in sessionStorage
    }
  }, []);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userDatascanner');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));  // Retrieve from sessionStorage
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (scanner) {
      scanner.reset();
      setIsScanning(false);
      setScannerStopped(true);
    }
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      setMediaStream(null);
    }
  }, [scanner, mediaStream]);

  const startScanning = () => {
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      setMediaStream(null);
    }

    setScannerStopped(true);
    setScannedData(null);
    setError(null);
    setFormUrl(null); // Reset the form URL

    setTimeout(() => {
      setScannerStopped(false);
    }, 0);

    if (videoRef.current) {
      const codeReader = new BrowserMultiFormatReader();
      setScanner(codeReader);

      codeReader
        .listVideoInputDevices()
        .then((devices) => {
          let selectedDeviceId = '';
          if (isMobileDevice()) {
            const backCamera = devices.find((device) => device.kind === 'videoinput' && device.label.includes('back'));
            selectedDeviceId = backCamera ? backCamera.deviceId : devices[0].deviceId;
          } else {
            const frontCamera = devices.find((device) => device.kind === 'videoinput' && device.label.includes('front'));
            selectedDeviceId = frontCamera ? frontCamera.deviceId : devices[0].deviceId;
          }

          codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
            if (result) {
              setScannedData(result.getText());
              stopScanning();
              if (isValidUrl(result.getText())) {
                const prefilledUrl = appendQueryParams(result.getText(), userData);
                setFormUrl(prefilledUrl); // Generate new URL with prefilled data
              } else {
                setError('Invalid QR code or unsupported data');
                setFormUrl(null);
              }
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error('Error scanning QR code:', err);
            }
          });
        })
        .catch((err) => {
          console.error('Error accessing video devices:', err);
        });
    }

    setIsScanning(true);
    setScannerStopped(false);
  };

  const isMobileDevice = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const appendQueryParams = (url: string, params: Record<string, string>) => {
    const urlObj = new URL(url);
    Object.keys(params).forEach((key) => {
      urlObj.searchParams.set(key, params[key]); // Use `set` instead of `append` to avoid duplicates
    });
    console.log('Generated Form URL:', urlObj.toString()); // Debugging
    return urlObj.toString();
  };

  const closePrefilledForm = () => {
    setFormUrl(null);
    setScannedData(null);
    setError(null);
    setScannerStopped(false);

    // Refresh the page
    window.location.reload();
  };

  useEffect(() => {
    if (scannedData) {
      stopScanning();
    }
  }, [scannedData, stopScanning]);

  useEffect(() => {
    return () => stopScanning();
  }, [stopScanning]);

  return (
    <>
      <Header activeLink="scanner" />
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-4xl font-bold mb-6 text-center">QR Code Scanner</h1>

        {!isScanning && !scannedData && (
          <button
            onClick={startScanning}
            className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Start Scanning
          </button>
        )}
        {isScanning && !scannedData && (
          <button
            onClick={() => { window.location.reload(); }}
            className="bg-red-600 text-white px-6 py-3 mt-4 rounded-full hover:bg-red-700 transition duration-300"
          >
            Stop Scanning
          </button>
        )}
        {!scannerStopped && !scannedData && (
          <div className="relative w-full max-w-lg mb-6">
            <video key={isScanning ? 'scanning' : 'stopped'} ref={videoRef} className="rounded-lg shadow-lg w-full h-auto" />
            {isScanning && (
              <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
                <span className="text-white text-xl">Scanning...</span>
              </div>
            )}
          </div>
        )}
        {formUrl && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-hidden relative">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feedback Form</h2>

              {/* Microsoft Logo and Instruction to Open in New Tab */}
              <div className="mt-6 text-center">
                <Image
                  src="/microsoft.png" // Example Microsoft logo
                  alt="Microsoft Logo"
                  height={40}
                  width={150}
                  className="w-1/4 mx-auto mb-4 cursor-pointer"
                  onClick={() => window.open(formUrl, '_blank')} // Opens the form in a new tab
                />
                <p className="text-gray-500">Click on the logo to fill out the form.</p>
              </div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-900"
                onClick={closePrefilledForm}
              >
                ✕
              </button>
            </div>
          </div>
        )}


        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-lg">{error}</div>
        )}
      </div>
      <Footer />
    </>
  );
}
