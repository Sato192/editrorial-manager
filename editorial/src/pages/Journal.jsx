import React from 'react'
import image1 from '../images/image1.jpeg'
import image2 from '../images/image2.jpeg'
import image3 from '../images/image3.jpeg'
import image4 from '../images/image4.jpeg'
import image5 from '../images/image5.jpeg'
import image6 from '../images/image6.jpeg'
import image7 from '../images/image7.jpeg'
import image8 from '../images/image8.jpeg'

const ArticleCard = ({ image, title, author, date }) => {
  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">by {author}</p>
        <p className="text-gray-600 text-sm">{date}</p>
      </div>
    </div>
  );
};
function Journal() {
  const updates = [
    {
      title: "New Issue Released: Vol 10, Issue 2",
      date: "May 20, 2024",
      description: "The latest issue of SatoJat Journal is now available. This issue covers a wide range of topics including advancements in AI, renewable energy, and more.",
    },
    {
      title: "Call for Papers: Special Edition on Climate Change",
      date: "April 15, 2024",
      description: "We are now accepting submissions for our special edition focused on climate change. Submit your research by July 1, 2024.",
    },
    {
      title: "Award for Best Paper 2023",
      date: "March 30, 2024",
      description: "Congratulations to Dr. Jane Doe for winning the Best Paper Award for her research on quantum computing.",
    },
  ];
  return (
    <div>
     <nav className='bg-blue-800 flex items-center px-10 py-4 justify-between sticky top-0 z-50 shadow-md'>
  <a href="/" className='text-3xl flex items-center space-x-2 font-sans font-bold text-cyan-50'>
    SatoJat Journal
  </a>
  <div className='space-x-6'>
    
   
    <a href='/publish' className="text-white hover:underline">Publish with Us</a>
    <a href='/about' className="text-white hover:underline">About Us</a>
    <input
      type="text"
      placeholder="Search for Journal"
      className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
    />
    <a href='/' className="bg-blue-800 px-4 ring-1 ring-black py-2 rounded-md text-white font-bold hover:bg-blue-600 transition duration-300">Submit your Manuscript</a>
  </div>
</nav>

      <main className='flex flex-col justify-center items-center p-6 bg-gray-50 min-h-screen'>
        <h1 className='text-4xl font-extralight my-6'>Overview :</h1>
        <div className='bg-white shadow-lg rounded-lg w-3/4 md:w-1/2 px-8 py-12 text-lg font-light'>
          <p className='mb-6'>
            Scientific Journal publishes original research on various scientific developments and system support tools, as well as case studies of scientific applications.
          </p>
          <ul className='list-disc pl-6 space-y-4'>
            <li>Recognized as a leading journal in the field of science.</li>
            <li>Boasts the highest Google h5-index score in the scientific domain.</li>
            <li>Features case studies alongside experimental and survey articles.</li>
            <li>Editorial board comprises the world's top scientific experts.</li>
          </ul>
          <p className='font-bold text-xl mt-8'>Editor in Chief: Hmidou Mustapha</p>
        </div>
      </main>

      <article className='flex flex-col items-center p-6 bg-gray-50 min-h-screen'>
        <h1 className='text-4xl font-extralight my-6 py-5 text-center'>Our lastest Articles :</h1>
        <div className="flex flex-wrap justify-center">
          <ArticleCard
            image={image1}
            title="Advancements in Quantum Computing"
            author="Alice Johnson"
            date="March 10, 2024"
          />
          <ArticleCard
            image={image2}
            title="Climate Change and Its Effects"
            author="Bob Smith"
            date="April 22, 2023"
          />
          <ArticleCard
            image={image3}
            title="Breakthroughs in Genetic Engineering"
            author="Catherine Lee"
            date="May 15, 2023"
          />
          <ArticleCard
            image={image4}
            title="The Impact of Blockchain Technology"
            author="David Brown"
            date="Jan 5, 2024"
          />
          <ArticleCard
            image={image5}
            title="Exploring the Human Genome"
            author="Emily Clark"
            date="July 12, 2022"
          />
          <ArticleCard
            image={image6}
            title="Renewable Energy Solutions"
            author="Frank Harris"
            date="August 20, 2021"
          />
          <ArticleCard
            image={image7}
            title="Artificial Intelligence in Healthcare"
            author="Grace Lee"
            date="September 15, 2023"
          />
          <ArticleCard
            image={image8}
            title="Advancements in Space Exploration"
            author="Henry Walker"
            date="Mai 3, 2024"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 mt-6">
          View All Articles
        </button>
      </article >
      <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl  font-light text-center mb-8">Latest Updates</h2>
        <div className="space-y-8 font-thin">
          {updates.map((update, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{update.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{update.date}</p>
              <p className="text-gray-800">{update.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
      <footer className="bg-blue-700 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">About SatoJat Journal</h2>
          <p className="text-sm">
            SatoJat Journal publishes cutting-edge research on a wide range of scientific disciplines, including but not limited to, physics, biology, chemistry, computer science, and environmental studies. Our mission is to disseminate high-quality scientific knowledge to a global audience.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm">Email: contact@satojatjournal.com</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
          <p className="text-sm">Address: 123 Science Blvd, Research City, RC 01234</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/submission" className="hover:underline">Submission Guidelines</a></li>
            <li><a href="/editorial-board" className="hover:underline">Editorial Board</a></li>
            <li><a href="/archive" className="hover:underline">Archive</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 border-t border-gray-600 pt-6 text-sm text-center md:text-left">
        <div className="md:flex md:justify-between">
          <p className="mb-4 md:mb-0">
            &copy; 2024 SatoJat Journal. All rights reserved.
          </p>
          <p>
            Follow us on 
            <a href="https://twitter.com/satojatjournal" className="ml-2 hover:underline">Twitter</a>, 
            <a href="https://facebook.com/satojatjournal" className="ml-2 hover:underline">Facebook</a>, and 
            <a href="https://linkedin.com/company/satojatjournal" className="ml-2 hover:underline">LinkedIn</a>.
          </p>
        </div>
      </div>
    </footer>

    </div>
  )
}

export default Journal