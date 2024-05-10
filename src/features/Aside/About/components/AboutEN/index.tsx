import BuyMeACoffee from '@/components/ui/BuyMeACoffee';

const AboutEN = () => {
  return (
    <div className={'article'}>
      <h1>About AOT APP</h1>
      <p>
        AOT APP is a fan-made web application based on the popular anime &quot;Attack on Titan&quot;. It was created for
        fans who want to improve their viewing experience and deepen their knowledge of the series&apos; rich universe.
      </p>

      <h2>Origin</h2>
      <p>
        The application was born out of the need to organize the vast amount of information about the characters and
        other elements of &quot;Attack on Titan&quot;. The creators&apos; goal was to create an intuitive tool that
        would make it easier to navigate this complex world.
      </p>

      <h2>Functionality</h2>
      <ul>
        <li>
          <h3>Discover</h3>
          <ul>
            <li>
              <strong>Character Gallery:</strong> Find information about any character quickly and easily.
            </li>
            <li>
              <strong>Quote Gallery:</strong> Browse quotes and rediscover the wisdom and humor of the characters.
            </li>
          </ul>
        </li>
        <li>
          <h3>Analyze</h3>
          <ul>
            <li>
              <strong>Comparison Tool:</strong> Compare different characters and discover the differences between them.
            </li>
            <li>
              <strong>Statistics (coming soon):</strong> Discover hidden relationships and patterns.
            </li>
          </ul>
        </li>
        <li>
          <h3>Personalize</h3>
          <ul>
            <li>
              <strong>Favorites:</strong> Save your favorite characters and quotes for easy access.
            </li>
          </ul>
        </li>
        <li>
          <h3>Test</h3>
          <ul>
            <li>
              <strong>Quizzes (coming soon):</strong> Test your knowledge of the characters, titans, and anime story.
            </li>
          </ul>
        </li>
      </ul>

      <h2>Additional Information</h2>
      <p>
        AOT APP is a fan project and is not affiliated with the official creators or publishers of &quot;Attack on
        Titan&quot;. The application is still under development, and its creators are constantly working on new features
        and improvements.
      </p>
      <p>
        The data are from various sources and have not been verified. It is possible that some data may not be correct.
      </p>

      <h2>Support me!</h2>
      <p>
        AOT APP is completely free and created with passion by fans for fans. If you want to appreciate my work and help
        in the further development of AOT APP, you can buy me a virtual tea on the Buy Me a Coffee platform:
      </p>
      <BuyMeACoffee />
    </div>
  );
};

export default AboutEN;
