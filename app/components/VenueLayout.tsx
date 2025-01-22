import Image from 'next/image'

const VenueLayout: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl  text-[#005696] font-bold mb-6 text-center">Leadership Conference - General Information</h1>

      <section className="mb-8">

        <p className="mb-4">
          <b className="text-2xl  text-[#005696] font-semibold mb-4">Hotel Address :  </b>
          Loews Atlanta
          1065 Peachtree St NE,
          Atlanta, GA 30309
        </p>
        <p className="mb-4  text-[#005696]"><b><a href='https://www.loewshotels.com/atlanta-hotel' target='blank'>https://www.loewshotels.com/atlanta-hotel</a></b></p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold  text-[#005696] mb-4">Floor Plan : </h2>
        <div className="relative w-full h-96 mb-4">
          <Image
            src="/venue.png"
            alt="Venue Floor Plan"
            layout="fill"
            objectFit="contain"
          />
        </div>
       
      </section>
      <section>
        <h2 className="text-2xl  text-[#005696] font-semibold mb-4">Technology Demonstrations:</h2>
        <p className="mb-4">
        IT will be presenting technology demonstrations in the hall outside of the general session meeting room. 
        Watch all Technology Demos and log your participation by scanning the QR code at the booths
        to be entered into the raffle for great prizes.
        </p>
        <div>

          <ul className="list-disc pl-5">
            <li>LG 55” TV</li>
            <li>Apple iPad</li>
            <li>Blink Video Doorbell</li>
            <li>Expresso machine</li>
            <li>And more....</li>
          </ul>
        </div>


      </section>
      <br/>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4  text-[#005696]">IT Help Desk:</h2>
        <p className="mb-4">The  Help Desk will be staffed Tuesday and Wednesday  from 9am – 3pm in the IT Room
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4  text-[#005696]">Network Access during the Conference:</h2>

        <div>

          <ul className="list-disc pl-5">
            <li>In your room, please use the hotel WiFi to access the internet.</li>
            <li>When you are in the conference area, BlueLinx network will be available just like at any of our branches and Atlanta Branch Support Center.</li>
          </ul>
        </div>


      </section>

      <br></br>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4  text-[#005696]">Dress code: </h2>
        <p className="mb-4">
          Business attire (jackets required) for Monday and Wednesday night. Business casual for all remaining events.
        </p>
      </section>

    </div>
  )
}

export default VenueLayout

