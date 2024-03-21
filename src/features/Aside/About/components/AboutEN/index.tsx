import BuyMeACoffee from '@/components/ui/BuyMeACoffee';
import {
  containerClassMobile,
  headingClass,
  listClass,
  listItemClass,
  paragraphClass,
  subHeadingClass
} from '@/constants/commonStyles';

const AboutEN = () => {
  return (
    <div className={containerClassMobile}>
      <h2 className={headingClass}>About AOT APP</h2>
      <p className={paragraphClass}>
        AOT APP is a fan-made web application based on the popular anime "Attack on Titan". It was created for fans who
        want to improve their viewing experience and deepen their knowledge of the series' rich universe.
      </p>

      <h2 className={headingClass}>Origin</h2>
      <p className={paragraphClass}>
        The application was born out of the need to organize the vast amount of information about the characters and
        other elements of "Attack on Titan". The creators' goal was to create an intuitive tool that would make it
        easier to navigate this complex world.
      </p>

      <h2 className={headingClass}>Functionality</h2>
      <ul className={listClass}>
        <li className={listItemClass}>
          <h3 className={subHeadingClass}>Discover</h3>
          <ul className={listClass}>
            <li className={listItemClass}>
              <strong>Character Gallery:</strong> Find information about any character quickly and easily.
            </li>
            <li className={listItemClass}>
              <strong>Quote Gallery:</strong> Browse quotes and rediscover the wisdom and humor of the characters.
            </li>
          </ul>
        </li>
        <li className={listItemClass}>
          <h3 className={subHeadingClass}>Analyze</h3>
          <ul className={listClass}>
            <li className={listItemClass}>
              <strong>Comparison Tool:</strong> Compare different characters and discover the differences between them.
            </li>
            <li className={listItemClass}>
              <strong>Statistics (coming soon):</strong> Discover hidden relationships and patterns.
            </li>
          </ul>
        </li>
        <li className={listItemClass}>
          <h3 className={subHeadingClass}>Personalize</h3>
          <ul className={listClass}>
            <li className={listItemClass}>
              <strong>Favorites:</strong> Save your favorite characters and quotes for easy access.
            </li>
          </ul>
        </li>
        <li className={listItemClass}>
          <h3 className={subHeadingClass}>Test</h3>
          <ul className={listClass}>
            <li className={listItemClass}>
              <strong>Quizzes (coming soon):</strong> Test your knowledge of the characters, titans, and anime story.
            </li>
          </ul>
        </li>
      </ul>

      <h2 className={headingClass}>Additional Information</h2>
      <p className={paragraphClass}>
        AOT APP is a fan project and is not affiliated with the official creators or publishers of "Attack on Titan".
        The application is still under development, and its creators are constantly working on new features and
        improvements.
      </p>

      <h2 className={headingClass}>Support us!</h2>
      <p className={paragraphClass}>
        AOT APP is completely free and created with passion by fans for fans. If you want to appreciate our work and
        help in the further development of AOT APP, you can buy us a virtual coffee on the Buy Me a Coffee platform:
      </p>
      <BuyMeACoffee />
    </div>
  );
};

export default AboutEN;
