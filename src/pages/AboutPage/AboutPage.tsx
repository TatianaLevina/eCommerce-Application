import type React from 'react';
import { Card, Flex, Image, Typography } from 'antd';
import LOGORSS from '../../images/its-a-good-job.svg';
import DZMITRY_FACE from '../../images/Dzmitry_Ryzhov.jpg';
import YULIYA_FACE from '../../images/Yuliya_Nadtacheyeva.jpg';
import TATIANA_FACE from '../../images/Tatiana_Levina.jpg';
import './AboutPage.scss';

const { Title, Text, Link } = Typography;

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1 className="custom-title">About us</h1>
      <Flex gap="small" vertical>
        <Card>
          <Flex wrap gap="large">
            <Link href="https://rs.school/" target="_blank" rel="noreferrer">
              <img src={LOGORSS} alt="RS School" className="about-page__image" />
            </Link>
            <Flex gap="small" vertical className="about-page__content">
              <Title level={3} className="about-page__title">
                RS School
              </Title>
              <Title level={5} className="about-page__subtitle">
                No matter your age, professional employment, or place of residence.
              </Title>
              <Text>
                RS School offers a unique learning experience as a free, community-based online education initiative.
                The RS School has been run by the Rolling Scopes community since 2013. Today, over 600
                developer-volunteers from various countries and companies assist as mentors. We believe in important
                ideas that guide our mission.
              </Text>
              <Link href="https://rs.school/" target="_blank" rel="noreferrer" className="custom-link">
                You can visit RS School
              </Link>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex wrap gap="large">
            <Image width={250} height={250} src={DZMITRY_FACE} />
            <Flex gap="small" vertical className="about-page__content">
              <Title level={3} className="about-page__title">
                Dzmitry Ryzhov
              </Title>
              <Text>
                Hi, my name is <strong>Dmitry</strong>, and I am a FullStack developer✨. (My main programming languages
                are TypeScript, C#). I am interested in both front-end🖥 and back-end💽 development. I like to learn new
                things. Experience with TypeScript, HTML, CSS, Scss, Vue.js, React, ASP.NET, PostgreSQL, MySQL, Delphi,
                Lisp. Some experience in developing microservices🔬.
              </Text>
              <Text>
                In addition, I also have some experience with UI component libraries/frameworks. Well, and experience as
                a design engineer📐 and mechanical engineer🛠 (AutoCAD, SOLIDWORKS). In my free time, I study and
                develop myself.
              </Text>
              <Text>
                I&#39;m certain that effective communication is paramount. Regular meetings, code reviews, and shared
                documentation that everyone is on the same page and working towards a common goal. It&#39;s why,
                together with the team, we adhere to these beliefs and try to constantly be in touch and resolve issues
                in a timely manner.
              </Text>
              <Text>
                <strong>During the project, my responsibilities were:</strong>
                <ul>
                  <li>Filling CommerceTools with mock data</li>
                  <li>Tests setup and implementation</li>
                  <li>Layouts drafts</li>
                  <li>And many, many other amazing and challenging issues 🚀</li>
                </ul>
              </Text>
              <Link href="https://github.com/demetrius81" target="_blank" rel="noreferrer" className="custom-link">
                You can visit my GitHub
              </Link>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex wrap gap="large">
            <Image width={250} height={250} src={YULIYA_FACE} />
            <Flex gap="small" vertical className="about-page__content">
              <Title level={3} className="about-page__title">
                Yuliya Nadtacheyeva
              </Title>
              <Text>
                Hello, my name is <strong>Yuliya</strong>. I am currently pursuing my second university degree, this
                time in Computer Science, with a specialization in JavaScript and TypeScript.
              </Text>
              <Text>
                Rapidly acquiring essential IT skills, I am proficient in coding, problem-solving, and adapting to new
                technologies and frameworks. With a strong dedication to personal and professional development, I
                actively seek out opportunities to expand my knowledge and explore new horizons. Open to new job
                opportunities, I am always eager to take on fresh challenges and collaborate on exciting projects.
              </Text>
              <Text>
                I believe that it&#39;s my natural curiosity that enables me to tackle challenges effectively and enjoy
                the process of overcoming them.
              </Text>
              <Text>
                United by a common goal, the team and I found a common language and tools for organizing joint work in a
                short time, which was reflected in the development of our project.
              </Text>
              <Text>
                <strong>During the project, my responsibilities were:</strong>
                <ul>
                  <li>API integration</li>
                  <li>Services and contexts for working with customer, cart, etc.</li>
                  <li>Routing</li>
                  <li>And many, many other amazing and challenging issues 🚀</li>
                </ul>
              </Text>
              <Link href="https://github.com/ynadt" target="_blank" rel="noreferrer" className="custom-link">
                You can visit my GitHub
              </Link>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex wrap gap="large">
            <Image width={250} height={250} src={TATIANA_FACE} />
            <Flex gap="small" vertical className="about-page__content">
              <Title level={3} className="about-page__title">
                Tatiana Levina
              </Title>
              <Text>
                Hey, my name is <strong>Tatiana</strong>. Currently, I am wearing a front-end developer hat, but also
                used to do system and business analyst work. I prefer to build fundamental understanding on how things
                really work and what concepts are lying under the hood. This approach allows me to make big leaps in
                mastering new frameworks or tools. During this project, I received a good experience with TypeScript,
                React and antd (library of design components) and would like to continue developing my skills with them.
              </Text>
              <Text>
                One of the biggest challenges was to organize effective team work especially when overlapping things
                should be implemented. Here are the keys I found for myself:
                <ul>
                  <li>Do not try to eat the complex task with one bite: split it into small portions.</li>
                  <li>Make Pull Requests small and focused.</li>
                  <li>
                    Supply comprehensive information on how things should be tested if automatic tests are absent.
                  </li>
                  <li>Keep the release branch always stable.</li>
                  <li>If you start to implement a new feature or fix a bug, always make your teammates know that</li>
                </ul>
              </Text>
              <Text>
                <strong>During the project, my responsibilities were:</strong>
                <ul>
                  <li>User Profile</li>
                  <li>Promocodes functionality</li>
                  <li>Header with a menu, About Us Page, 404 Page </li>
                  <li>And many, many other amazing and challenging issues 🚀</li>
                </ul>
              </Text>
              <Link href="https://github.com/TatianaLevina" target="_blank" rel="noreferrer" className="custom-link">
                You can visit my GitHub
              </Link>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default AboutPage;
