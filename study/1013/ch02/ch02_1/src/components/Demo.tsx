import * as D from "../data";

const Demo =() => {
    const children = D.makeArray(10).map((notUsed, index) => (
        <div key={index}>
            <p>{D.randomId()}</p>
            <p>{D.randomName()}</p>
            <p>{D.randomJobTitle()}</p>
            <p>{D.randomSentence()}</p>
            <img src={D.randomAvatar()} width={100} height={100} />
        </div>
    ));

  return (
    <>
      <h1>Demo</h1>
      <p>
        {D.randomName()}, {D.randomJobTitle()}, {D.randomDayMonthYear()}
      </p>
      <img src={D.randomAvatar()} width={100} height={100} alt="avatar" />
      <img src={D.randomImage()} width={100} height={100} alt="random image" />
      {children}
    </>
  );
}

export default Demo;