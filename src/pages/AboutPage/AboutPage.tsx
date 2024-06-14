import type React from 'react';
import { Card, Flex, Image, Typography } from 'antd';
import LOGORSS from '../../images/its-a-good-job.svg';
import DZMITRY_FACE from '../../images/Dzmitry_Ryzhov.jpg';
import YULIYA_FACE from '../../images/Yuliya_Nadtacheyeva.jpg';
import TATIANA_FACE from '../../images/Tatiana_Levina.jpg';

const { Title, Text, Link } = Typography;

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1 className="custom-title">About us</h1>
      <Flex gap="small" vertical>
        <Card>
          <Flex>
            <Link href="https://rs.school/" target="_blank" rel="noreferrer">
              <img src={LOGORSS} alt="RS School" style={{ width: '250px', height: '250px' }} />
            </Link>
            {/* <Image
              width={250}
              height={250}
              src="error"
              fallback="data:image/png;base64,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"
            /> */}
            <Flex gap="small" vertical style={{ maxWidth: '60%', marginLeft: '20px' }}>
              <Title
                level={3}
                style={{
                  color: '#376a4f',
                  // textAlign: 'center',
                  marginTop: 0,
                }}
              >
                RS School
              </Title>
              <Title
                level={5}
                style={{
                  color: '#886b1c',
                  // textAlign: 'center',
                  marginTop: 0,
                }}
              >
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
          <Flex>
            <Image width={250} height={250} src={DZMITRY_FACE} />
            <Flex gap="small" vertical style={{ maxWidth: '60%', marginLeft: '20px' }}>
              <Title
                level={3}
                style={{
                  color: '#376a4f',
                  // textAlign: 'center',
                  marginTop: 0,
                }}
              >
                Dzmitry Ryzhov
              </Title>
              <Text>
                Hi, my name is Dmitry, and I am a FullStack developer✨. (My main programming languages are TypeScript,
                C#). I am interested in both front-end🖥 and back-end💽 development. I like to learn new things.
                Experience with TypeScript, HTML, CSS, Scss, Vue.js, React, ASP.NET, PostgreSQL, MySQL, Delphi, Lisp.
                Some experience in developing microservices🔬.
              </Text>
              <Text>
                In addition, I also have some experience with UI component libraries/frameworks. Well, and experience as
                a design engineer📐 and mechanical engineer🛠 (AutoCAD, SOLIDWORKS). In my free time, I study and
                develop myself.
              </Text>
              <Link href="https://github.com/demetrius81" target="_blank" rel="noreferrer" className="custom-link">
                You can visit my GitHub
              </Link>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex>
            <Image width={250} height={250} src={YULIYA_FACE} />
            <Flex gap="small" vertical style={{ maxWidth: '60%', marginLeft: '20px' }}>
              <Title
                level={3}
                style={{
                  color: '#376a4f',
                  // textAlign: 'center',
                  marginTop: 0,
                }}
              >
                Yuliya Nadtacheyeva
              </Title>
              <Text>Role: Front-end Developer</Text>
              <Text>
                I am currently pursuing my second university degree, this time in Computer Science, with a
                specialization in JavaScript and TypeScript.
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
              <Link href="https://github.com/ynadt" target="_blank" rel="noreferrer" className="custom-link">
                You can visit my GitHub
              </Link>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex>
            <Image width={250} height={250} src={TATIANA_FACE} />
            <Flex gap="small" vertical style={{ maxWidth: '60%', marginLeft: '20px' }}>
              <Title
                level={3}
                style={{
                  color: '#376a4f',
                  // textAlign: 'center',
                  marginTop: 0,
                }}
              >
                Tatiana Levina
              </Title>
              <Text>
                Hey, my name is Tatiana. Currently, I am wearing a front-end developer hat, but also used to do system
                and business analyst work. I prefer to build fundamental understanding on how things really work and
                what concepts are lying under the hood. This approach allows me to make big leaps in mastering new
                frameworks or tools. During this project, I received a good experience with TypeScript, React and antd
                (library of design components) and would like to continue developing my skills with them.
              </Text>
              <Text>
                One of the biggest challenges was to organize effective team work especially when overlapping things
                should be implemented. Here are the keys I found for myself:
                <ul>
                  <li> Do not try to eat the complex task with one bite: split it into small portions.</li>
                  <li>Make Pull Requests small and focused.</li>
                  <li>
                    Supply comprehensive information on how things should be tested if automatic tests are absent.
                  </li>
                  <li>Keep the release branch always stable.</li>
                  <li>If you start to implement a new feature or fix a bug, always make your teammates know that</li>
                </ul>
                They sound familiar, aren&#39;t they?
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
