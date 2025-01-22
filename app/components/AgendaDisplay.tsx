'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AgendaDisplay: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#005696]">
        BlueLinx 2025 Leadership Conference Agenda
      </h1>
      <p className="mb-4 text-center">
        <strong>Date:</strong> January 27, 2025 – January 30, 2025<br />
      </p>
      <p className="mb-4 text-center">The general schedule is as follows:</p>

      <div className="space-y-8 mb-5">
        {["Monday, January 27th", "Tuesday, January 28th", "Wednesday, January 29th", "Thursday, January 30th"].map((date, index) => (
          <AgendaDay key={index} date={date} events={getEventsForDate(date)} />
        ))}
      </div>

      <FooterNote />
    </div>
  );
};

const FooterNote: React.FC = () => (
  <>
    <p className="mb-4 text-[#005696]">
      <b>NOTE:</b> This year our supplier meetings will be held all day, Tuesday from 09:00am – 05:00pm and Wednesday from 08:00am - 01:45pm.
      There are a few teams (HR, Finance, Legal) that will not attend this portion of the meeting, with the exception being those who aren’t local (check with your manager if you have questions).
      All meeting attendees are invited to attend the offsite activity on Tuesday night and the details for this will be announced at a future date.
    </p>
    <p className="mb-4 text-[#005696]">
      ELT, RVPs, GMs, and invitees from Pricing, Product Management, National Accounts, Ops and IT will have meetings and will be on-site Mon-Thurs.
    </p>
  </>
);

interface Event {
  time: string;
  description: string;
  participants?: string;
  presenters?: string;
  room?: string;
  feedbackButton?: boolean;
}

const getEventsForDate = (date: string): Event[] => {
  const events: Record<string, Event[]> = {
    "Monday, January 27th": [
      { time: "12:00pm-01:00pm", description: "Lunch", participants: "All", presenters: "N/A", room: "Overlook East" },
      { time: "01:00pm-03:00pm", description: "Region Meetings", participants: "RVPS, GMs, Invited Guests", presenters: "N/A", room: "See Below", feedbackButton: true },
      { time: "03:15pm-04:45pm", description: "Multifamily / Builder discussion", participants: "RVPs, GMs, ELT Optional ", presenters: "Luke Fallon / Jon Slaunwhite ", room: "Ellington Salon DEF" , feedbackButton: true },
      { time: "05:00pm-06:00pm", description: "Private Executive Reception", participants: "ELT, RVPs, Supplier Executives Only", presenters: "N/A", room: "Overlook West" },
      { time: "06:00pm-08:30pm", description: "Cocktail Reception - Jackets Required", participants: "All", presenters: "N/A", room: "Overlook East" },
    ],
    "Tuesday, January 28th": [
      { time: "06:30am-07:30am", description: "Breakfast", participants: "All", presenters: "N/A", room: "Overlook East" },
      { time: "07:45am-08:45am", description: "Keynote Speaker - Special Guest", participants: "All", presenters: "N/A", room: "Ellington Salon DEF" ,feedbackButton: true},
      { time: "09:00am-12:00pm", description: "Supplier Meetings", participants: "RVPs, GMs, Central Teams, ELT Optional ", presenters: "BlueLinx Team / Suppliers", room: "See Schedule",feedbackButton: true },
      { time: "12:00pm-01:00pm", description: "Lunch", participants: "All", presenters: "N/A", room: "Overlook East" },
      { time: "01:00pm-05:00pm", description: "Supplier Meetings", participants: "RVPs, GMs, Central Teams, ELT Optional ", presenters: "BlueLinx Team / Suppliers", room: "See Schedule",feedbackButton: true },
      { time: "06:00pm-09:00pm", description: "Offsite activities - The Painted Duck", participants: "All - Bus transportation provided", presenters: "N/A", room: "Offsite" },

    ],
  "Wednesday, January 29th": [
  { time: "07:00am-08:00am", description: "Breakfast", participants: "All", presenters: "N/A", room: "Overlook East" },
  { time: "08:00am-12:00pm", description: "Supplier Meetings", participants: "RVPs, GMs, Central Teams, ELT Optional", presenters: "BlueLinx Team / Suppliers", room: "See Schedule",feedbackButton: true },
  { time: "12:00pm-01:00pm", description: "Lunch", participants: "All", presenters: "N/A", room: "Overlook East" },
  { time: "01:00pm-02:00pm", description: "CEO Opening remarks - Fireside Chat RVPs", participants: "All", presenters: "Shyam, Mike, RVPs", room: "Ellington Salon DEF",feedbackButton: true },
  { time: "02:00pm-02:45pm", description: "Market, Strategy, Greenfield, M&A update", participants: "All", presenters: "Sean Dwyer", room: "Ellington Salon DEF",feedbackButton: true },
  { time: "02:45pm-03:00pm", description: "Break", participants: "All", presenters: "N/A", room: "Ellington Salon DEF" },
  { time: "03:00pm-04:30pm", description: "Operations Update", participants: "All", presenters: "Chad Lee", room: "Ellington Salon DEF" ,feedbackButton: true},
  { time: "04:30pm-05:00pm", description: "Legal Update", participants: "All", presenters: "Christin, Brad, Christina", room: "Ellington Salon DEF" },
  { time: "05:30pm-06:30pm", description: "Cocktail Reception - Jackets Required", participants: "All", presenters: "N/A", room: "Effington Pre Function" },
  { time: "06:30pm-09:00pm", description: "Dinner, Guest Speaker, Awards Presentation", participants: "BlueLinx only", presenters: "John Tien / RVPs / Mike / Shyam", room: "Ellington Salon DEF" },
],

  "Thursday, January 30th": [
  { time: "06:30am-07:30am", description: "Breakfast", participants: "All", presenters: "N/A", room: "Overlook East" },
  { time: "07:30am-08:15am", description: "Inventory Management", participants: "All", presenters: "Mark Wasson / Jim Morris", room: "Ellington Salon DEF",feedbackButton: true },
  { time: "08:15am-09:00am", description: "Human Resources Update", participants: "All", presenters: "Keisha Duck", room: "Ellington Salon DEF",feedbackButton: true },
  { time: "09:00am-09:15am", description: "Break", participants: "All", presenters: "N/A", room: "Ellington Salon DEF" },
  { time: "09:15am-10:00am", description: "Finance Business Update", participants: "All", presenters: "Billy Banks / Jake Wood", room: "Ellington Salon DEF" ,feedbackButton: true},
  { time: "10:00am-10:45am", description: "National Accounts - Retail Focus", participants: "All", presenters: "Leo Oei / Mark Baxley", room: "Ellington Salon DEF" ,feedbackButton: true},
  { time: "10:45am-11:45am", description: "CEO Fireside Chat with Ashley Grice", participants: "All", presenters: "Shyam / Ashley Grice", room: "Ellington Salon DEF" ,feedbackButton: true},
  { time: "11:45am-12:00pm", description: "Closing remarks - Q&A", participants: "All", presenters: "N/A", room: "Ellington Salon DEF" },
],

  };

  return events[date] || [];
};

interface AgendaDayProps {
  date:string;
  events:Array<Event>;
}

const AgendaDay : React.FC<AgendaDayProps> = ({ date, events }) => {
  const [isOpen,setIsOpen] = useState<boolean>(false);

 const toggleAccordion = () => {
   setIsOpen(!isOpen);
 };

 return (
   <div className="border border-[#005696] rounded-lg mb-4">
     <h2
       className="text-xl font-semibold p-4 bg-[#005696] text-white cursor-pointer flex justify-between items-center"
       onClick={toggleAccordion}
     >
       {date}
       <span>{isOpen ? '▼' : '▲'}</span>
     </h2>
     {isOpen && (
       <ul className="space-y-6 p-4 bg-white">
         {events.map((event,index) => (
           <li key={index} className="border-b pb-4 mb-4 last:border-none last:border-b-none last:p-0">
             <div className="flex flex-col sm:flex-row sm:item-center sm:sapce-x-4 space-y-2 sm:sapce-y-0">
               <span className="w-full sm:w-40 font-medium text-[#005696]"><strong>{event.time}</strong></span>
               <div>
                 <p><strong>Description:</strong> {event.description}</p>
                 <p><strong>Participants:</strong> {event.participants}</p>
                 <p><strong>Presenters:</strong> {event.presenters}</p>
                 <p><strong>Room:</strong> {event.room}</p>
                 {event.feedbackButton && (
                   <FeedbackButton event={event} date={date} />
                 )}
               </div>
             </div>
           </li>
         ))}
       </ul>
     )}
   </div>
 );
};

const FeedbackButton = ({ event, date }: { event: Event; date:string }) => {
 const router = useRouter();
 const [userData,setUserData] = useState<string | null>(null);
 const [userEmail,setUserEmail] = useState<string | null>(null);
 const [loading,setLoading] = useState<boolean>(true);

 useEffect(() => {
   const storedUserData = sessionStorage.getItem('userData');
   const storedUserEmail = sessionStorage.getItem('userEmail');

   if (!storedUserData || !storedUserEmail) {
     router.push('/');
   } else {
     setUserData(storedUserData);
     setUserEmail(storedUserEmail);
   }
   setLoading(false);
 }, [router]);

 if (loading || !userData || !userEmail) {
   return null; // Optionally show a loader
 }

 const email = userEmail.toString();
 const userFirstName = userData.toString().split(" ")[0];
 const userLastName = userData.toString().split(" ")[1];

 const feedbackLink =
   `https://forms.office.com/Pages/ResponsePage.aspx?id=e-O6gL9JtkiU-M7d-A2RGqLkK95AnKhKiKuO4O4QAktUNk5PSU0wNkI2Wlk2SUNGTlpVTFVGTUNXTC4u&r2c2e820b370543308fc7cf9af43ee6cd=${userFirstName}&r1bf06896f7e943d0ad87125f1d45a24d=${userLastName}&r8926e842396c48b89551a08b1a3580ee=${email}&rffc6f3dc0a624a4a9e5b5b085ef3b19f=`;

 return (
   <button
     className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded shadow hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
     onClick={() =>
       window.open(
         feedbackLink +
           encodeURIComponent(
             `${date.split(",")[1]} - ${event.time.split("-")[0]} - ${event.description}`
           ),
         "_blank"
       )
     }
   >
     Feedback
   </button>
 );
};

export default AgendaDisplay;
