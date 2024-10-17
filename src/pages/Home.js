import React, { useEffect, useState } from 'react';  // Add import statement for useState
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import image from '../assets/indexPic.jpg';
import whoAreWe from '../assets/whoAreWe.jpg';
import mission from '../assets/mission.jpg';
import vision from '../assets/vision.jpg';
import Hilda2 from '../assets/Hilda2.jpg';
import Sean from '../assets/Sean.jpg';
import Motebang from '../assets/Motebang.jpg';
import Phetolo from '../assets/Phetolo.jpg';
import Yolisa from '../assets/Yolisa.jpg';
import Sfiso from '../assets/Sfiso.jpg';
import water from '../assets/water.jpg'
import desigh from '../assets/desigh.jpg'
import Renewable_energy from '../assets/Renewable_energy.jpg'
import '../styles/Home.css';
import ChatBox from './ChatBox ';
import TruncatedText from './TruncatedText';

 
const TeamMember = ({ name, position, bio }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Col md={4} className='d-flex justify-content-center'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={bio.image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Position: {position}</Card.Text>
          <Button variant='success' onClick={() => setShowDescription(!showDescription)}>
            {showDescription ? 'Hide Bio' : 'Read My Bio'}
          </Button>
          {showDescription && (
            <div className='mt-3'>
              <p>{bio.description}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const Home = () => {

  const sentences = [
    'HMP Engineering Solutions offers solar-powered food dryers and food distribution technologies to enhance food security.',
    'We develop sustainable solutions, combining mechanical, electrical, and software expertise for food preservation.',
    'HMP Engineering Solutions provides energy-efficient products and services to improve food supply chain resilience.'
  ];

  const [currentSentence, setCurrentSentence] = useState('');
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const images = [
    '../assets/Engineering_team.jpg',
    '../assets/Engineering_team2.jpg',
    '../assets/Engineering_team3.jpg', // Add more image paths here
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  useEffect(() => {
    const typingDelay = 100; // Delay in ms between each character
    const sentenceDelay = 1000; // Delay before starting the next sentence after one finishes

    // If there are more characters to type in the current sentence
    if (charIndex < sentences[sentenceIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentSentence((prev) => prev + sentences[sentenceIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingDelay);
      return () => clearTimeout(timeout);
    } else {
      // Wait before starting the next sentence
      const timeout = setTimeout(() => {
        setCurrentSentence(''); // Clear the current sentence
        setCharIndex(0); // Reset character index
        setSentenceIndex((prev) => (prev + 1) % sentences.length); // Move to the next sentence or loop back
      }, sentenceDelay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, sentenceIndex, sentences]);
  return (
    <div style={{ minHeight: '75vh', position: 'relative' }}>
      
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,0.5)),url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: 'rgb(28, 28, 28)',
          height: '500px',
          width: '100%',
        }}
      >
        
        <ChatBox />
        <a href="/shop">
          <Button
            variant='primary'
            style={{
              fontWeight: 'bold',
              backgroundColor: 'green',
              color: 'white',
              width: '150px',
              height: '50px',
              marginTop: '100px',
              marginLeft: '112px',
              fontSize: '20px',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            Shop Now
          </Button>
        </a>
        
         
      </div>
      <p style={{ 
        minHeight: '4rem', // Adjust based on the longest sentence
        fontSize: '1rem', 
        color: 'green', 
        textAlign: 'center',
        fontWeight:'bold',
        marginBottom: '20px' // Space between text and buttons
      }}>
        {currentSentence}
      </p>
      <Container>
  <Row>
    <Col md={6}>
      <div className='d-flex justify-content-center' style={{ marginTop: 60 }}>
        <div className='rounded-img' style={{ backgroundImage: `url(${whoAreWe})` }}></div>
      </div>
    </Col>
    <Col md={6}>
      <div style={{ marginTop: 60 }}>
        <h1 className='text-center'>Who we are</h1>
        <p className='text-center'>
        <TruncatedText text={`HMP Engineering Solutions is an innovative engineering design company headquartered in Johannesburg, South Africa. Founded by Hilda Forsythe in 2020, our mission is to revolutionize engineering design with a strong emphasis on addressing food security challenges.
          At HMP Engineering Solutions, we understand the critical importance of food security in today's world. That's why our team of design engineers, spanning mechanical, electrical, electronics, and software backgrounds, is dedicated to developing sustainable solutions that prioritize food security and sustainability.
          Since our inception, we have been at the forefront of engineering design, leveraging cutting-edge technology and expertise to create solutions that make a meaningful impact. Whether it's developing solar-powered food dryers to combat food waste or implementing information technology solutions to enhance food distribution networks, our work is driven by our commitment to building a more resilient and food-secure future.
          With a focus on sustainability and innovation, we continue to push the boundaries of engineering design, helping our clients navigate the complexities of the fast-paced global market while championing the cause of food security for all.
          `}maxLines={6} />
        </p>
      </div>
    </Col>
  </Row>

  <Row>
    <Col md={6}>
      <div className='d-flex justify-content-center' style={{ marginTop: 60 }}>
        <div className='rounded-img' style={{ backgroundImage: `url(${mission})` }}></div>
      </div>
    </Col>
    <Col md={6}>
      <div style={{ marginTop: 60 }}>
        <h1 className='text-center'>Our Mission</h1>
        <p className='text-center'>
          To pioneer sustainable engineering solutions that empower communities, preserve resources, and secure food for future generations. Through innovation, expertise, and unwavering commitment to food security, we strive to revolutionize the way we design, build, and sustain our world, leaving a lasting legacy of resilience and prosperity.
        </p>
      </div>
    </Col>
  </Row>

  <Row>
    <Col md={6}>
      <div className='d-flex justify-content-center' style={{ marginTop: 60 }}>
        <div className='rounded-img' style={{ backgroundImage: `url(${vision})` }}></div>
      </div>
    </Col>
    <Col md={6}>
      <div style={{ marginTop: 60 }}>
        <h1 className='text-center'>Our vision</h1>
        <p className='text-center'>
          To be at the forefront of a global movement, transforming the way we design, build, and sustain our communities, while inspiring a future where every individual thrives in a resilient and food-secure environment.
        </p>
      </div>
    </Col>
  </Row>
        
  <Row className='my-4'>
          <Col md={12} className='d-flex justify-content-center'>
          <div style={{ marginTop: 60, fontWeight:'bold' }}>
        <h1 className='text-center'>OUR WORK</h1>
          </div>
          </Col>
          <Row className='align-items-center mt-5'>

          <Col md={4} className='d-flex justify-content-center'>
            <Card style={{ width: '25rem', marginTop: 20 }}>
              <Card.Img variant='top' src={desigh} height={280} />
              <Card.Body>
                <Card.Title>WE ARE THE DESIGNER AND MANUFACTURER OF THE SOLAR POWERED FOOD DRYER</Card.Title>
                <Card.Text>
                  <TruncatedText text={`Our State-of-the-art solar-powered food dryers are designed to revolutionise the food processing industry. Our machines harness the power of the sun to efficiently and sustainably dry a wide range of food products, including fruits, vegetables, and meats. With our innovative technology, businesses can reduce their reliance on conventional power sources and minimise their environmental footprint.
                  We sell and also offer Rental Options for these machines. Our flexible rental options make it easy for South Africans to start their own drying businesses without the upfront costs associated with purchasing equipment. With access to high-quality machines at affordable prices, entrepreneurs can embark on their entrepreneurial journey with confidence and ease.

                `}maxLines={3} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className='d-flex justify-content-center'>
  <Card style={{ width: '25rem', marginTop: 20 }}>
    <Card.Img variant='top' src={Renewable_energy} height={280} />
    <Card.Body>
      <Card.Title>RENEWABLE ENERGY SOLUTIONS</Card.Title>
      <Card.Text>
        <TruncatedText text={`Are you looking to optimise your energy usage and reduce costs or to beat load shedding? Look no further! At HMP Engineering Solutions we specialise in providing top-notch energy solutions tailored to your needs
          Energy Consumption Audits: Gain valuable insights into your energy usage with our thorough audits. Our expert team will identify areas of inefficiency and provide actionable recommendations to help you save on energy costs.
          Procurement Assistance for Backup Systems: Ensure uninterrupted power supply with our procurement assistance for backup systems. From generators to solar backup solutions, we'll help you find the perfect fit for your needs and budget.
          Professional Installations: Leave the heavy lifting to us! Our experienced technicians will handle the installation of your backup systems with precision and efficiency, ensuring seamless integration into your existing infrastructure.
          Reliable Aftercare: Our commitment to your satisfaction doesn't end after installation. Count on us for ongoing support and maintenance to keep your systems running smoothly for years to come.
          With HMP Engineering Solutions, you can trust that your energy needs are in good hands. Don't let inefficiencies drain your budget – contact us today to learn more about how we can help you unlock savings and streamline your energy usage!`} 
          maxLines={5} />
      </Card.Text>
    </Card.Body>
  </Card>
  </Col>
          
       <Col md={4} className='d-flex justify-content-center'>
            <Card style={{ width: '25rem', marginTop: 20 }}>
              <Card.Img variant='top' src={water} height={280} />
              <Card.Body>
                <Card.Title>WATER COLLECTION AND STORAGE SOLUTIONS</Card.Title>
                <Card.Text>
                  <TruncatedText text={`Combat Water Shortages and Flooding with Our Innovative Solutions!

                      Are you tired of water pump failures and frequent water cuts due to load shedding? Are you seeking eco-friendly solutions to manage stormwater and prevent flooding? Look no further – HMP Engineering Solutions has you covered!

                      Resilient Water Solutions: With load shedding on the rise, water pumps are under increasing strain. Our durable and reliable inflatable water tanks provide a cost-effective solution for water storage. Made with high-quality vinyl, these tanks are easy to install, move, and camouflage – perfect for areas where security is a concern.

                      Permeable Paving for Sustainable Drainage: Say goodbye to flooding and hello to sustainable drainage solutions with our permeable paving technology! Designed for rainwater filtration and collection, permeable paving is ideal for areas prone to flooding. Our expert team specialises in design and installation, ensuring optimal performance and longevity.

                      Don't let water shortages and flooding disrupt your life – contact HMP Engineering Solutions today to learn more about our innovative water solutions and take the first step towards a more resilient future!
                    `}maxLines={4} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>

      </Row>

        <Row className='my-4'>
        <Col md={12} className='d-flex justify-content-center'>
          <div style={{ marginTop: 60, fontWeight:'bold' }}>
        <h1 className='text-center'>OUR TEAM</h1>
          </div>
          </Col>
          <Row className='align-items-center mt-5'></Row>
          <TeamMember
            name="Hilda Forsythe"
            position="Founding director & CEO."
            bio={{
              image: Hilda2,
              description:
              `From the dusty streets of Ficksburg in the Free State, Hilda pursued Mechanical Engineering at the University of Johannesburg. She enhanced rail safety for Transnet with her BEng thesis, and further designed and prototyped a solar-powered baking oven for her Master's thesis. Hilda's professional journey spans aviation, engineering sales, and Research and Development, with publications to her credit. Beyond mechanical engineering, she holds qualifications and experience in AI, Six Sigma, and Business Management. Recognizing South Africa's technological lag, she founded HMP Engineering Solutions to propel Africa into the global food preservation market. Committed to societal impact, Hilda strives for inclusive growth through sustainable technological solutions, leaving a positive mark on the world in every endeavor.`
            }}
          />

          <TeamMember
            name="PHETOLO MPE"
            position="SOFTWARE ENGINEER."
            bio={{
              image: Phetolo,
              description:
              `With a Bachelor of Science degree in Mathematical Sciences, specializing in Computer Sciences and Statistics, Phetolo exemplifies prowess in web development. He possesses a comprehensive skill set, adept at crafting dynamic websites that address complex business challenges while prioritizing user experience. His proficiency spans the entire web development spectrum, from UI/UX design to backend implementation, leveraging languages like JavaScript, React, Java, and HTML/CSS. As a Full Stack developer, Phetolo excels in creating robust, user-friendly applications. His commitment to continuous learning is evident, with diverse interests ranging from design to callisthenics, enriching both his personal life and professional perspective. Phetolo finds his work at HMP Engineering deeply meaningful, and his contributions since joining the team in 2022 have been nothing short of remarkable, reflecting his unwavering dedication and exceptional talent.`,
            }}
          />

           <TeamMember
            name="MOTEBANG MOSEME"
            position="ELECTRICAL AND ELECTRONICS ENGINEER."
            bio={{
              image: Motebang,
              description:
              `Motebang epitomizes intellectual brilliance, rising above adversity as an orphan for over 2 decades to become a top achiever. Awarded the government's top achiever grant, he pursued an Electrical and Electronics Engineering Degree at the University of Johannesburg. His passion lies in creating sustainable, affordable intelligent houses. Joining HMP Engineering Solutions in 2022, Motebang found a perfect match for his vision and values. He derives professional satisfaction from knowing that his engineering work positively impacts lives. Beyond academia, Motebang enjoys Martial Arts, Chess, and exploring through reading, writing, and travel, showcasing his multifaceted brilliance and insatiable curiosity.`,
            }}
          />
        </Row>

        <Row className='my-4'>
          <TeamMember
    name="SEAN FORSYTHE"
    position="HEAD OF INSTALLATION & MAINTENANCE."
     bio={{
       image: Sean,
       description: `
       In 2009, Sean completed a City & Guilds NVQ Level 3 apprenticeship in Heating & Ventilation (Service and Maintenance) with Leeds College of Building and Mitton Mechanical Services in England. He gained invaluable experience in the HVAC industry, which continues to benefit him today. He has traveled extensively, encountering diverse cultures and witnessing firsthand the stark realities of poverty. These experiences have broadened his perspective and fueled his passion for making a difference. Joining HMP Engineering in 2021, Sean found alignment with the company's ethos, challenging him to exceed expectations and contribute meaningfully to addressing pressing global issues. He is committed to helping HMP Engineering expand its impact beyond South Africa, reaching those most in need worldwide. With his dedication and shared vision, the future of HMP Engineering is indeed bright, green, and promising.
       `,
         }}
       />   
          
        <TeamMember
            name="YOLISA MBUQE"
            position="LEGAL COUNSEL"
            bio={{
              image: Yolisa,
              description:
              `From birth, Yolisa sought meaningful endeavors aligned with personal values. Joining HMP Engineering Solutions in 2022 revealed his true calling: driving impactful change in communities. Armed with an honours degree in law from Fort Hare University and a Software Design and Architecture certificate from Coursera/University of Alberta, he embarked on a journey of professional growth. His tenure as an External Sales Executive honed his client interaction and marketing skills. Now serving as a Legal intern, Yolisa provides invaluable legal support, ensuring compliance, mitigating risks, and drafting essential legal documents to propel HMP Engineering Solutions toward its transformative goals.`,
            }}
          />
          <TeamMember
            name="SFISO LANGA"
            position="MARKETING MANAGER"
            bio={{
              image: Sfiso,
              description:
              `As a fervent marketer, Sifiso holds an advanced diploma in Marketing from Tshwane University of Technology (2020). His experience includes a year of in-service training at NHBRC, focusing on internal and external branding. Currently serving as a marketing intern at HMP Engineering Solutions, he formulates dynamic marketing strategies and action plans to drive organizational objectives. Sifiso is driven by a passion for learning, growth, and embracing new challenges inherent in the ever-evolving field of marketing, poised to contribute significantly to the continued success of HMP Engineering Solutions.`,
            }}
          />
        </Row>

       
      </Container>
    </div>
  );
};

export default Home;
