'use client';

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const BoothData: React.FC = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const profileData = sessionStorage.getItem('userData');
        if (profileData) {
            setUserName(profileData);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading && userName === null) {
            router.push('/');
        }
    }, [userName, loading, router]);

    if (loading) {
        return null; // Consider adding a loading spinner or message here
    }

    const tableData = [
        { boothNumber: 1, topics: "Artificial Intelligence & Automation" },
        { boothNumber: 2, topics: "Lenovo Monitor Docking Solution" },
        { boothNumber: 3, topics: "Drivers Tablets Remote Management, Utilization Analytics" },
        { boothNumber: 4, topics: "New Time Clocks and Driver Tablets" },
        { boothNumber: 5, topics: "Security Cameras Mobile Platform & Safety Video Analytics" },
        { boothNumber: 6, topics: "Branch Technology Enhancements/Support" },
        { boothNumber: 7, topics: "Warehouse Barcode Scanning Solution" },
        { boothNumber: 8, topics: "E-Commerce Solution" },
        { boothNumber: 9, topics: "Security" },
    ];

    return (
        <>
            <Header activeLink="booth" />
            <div className="max-w-5xl mx-auto my-8 p-4 mb-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-[#005696]">Booth Information</h1>
                <table className="min-w-full border-collapse border border-[#005696]">
                    <thead>
                        <tr className="bg-[#005696] text-white">
                            <th className="border border-[#005696] p-4 text-left">Booth #</th>
                            <th className="border border-[#005696] p-4 text-left">Topic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((booth) => (
                            <tr key={booth.boothNumber} className="hover:bg-[#e0fbfc]">
                                <td className="border border-[#005696] p-4">{booth.boothNumber}</td>
                                <td className="border border-[#005696] p-4">{booth.topics}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br/>
            <Footer />
        </>
    );
};

export default BoothData;