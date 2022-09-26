import classes from "./HomeList.module.css";
import { Link, useNavigate } from "react-router-dom";

const HomeList = () => {
  let navigate = useNavigate();

  const templateArticles = [
    {
      id: "1",
      title: "Can I have a refund? How?",
      description:
        "Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  ",
    },
    {
      id: "2",
      title: "How can I start ordering?",
      description:
        "Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      id: "3",
      title: "How do I sign up?",
      description:
        "Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      id: "4",
      title: "How can I pay?",
      description:
        "Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      id: "5",
      title: "I can't find a destination. Why?",
      description:
        "Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      id: "6",
      title: "Where is my control panel?",
      description:
        "Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
  ];
  const templateArticlesplus = [
    {
      id: "1",
      title: "How do I contact your team?",
      description:
        "Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  ",
    },
    {
      id: "2",
      title: "How do I change my data?",
      description:
        "Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Loressm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
  ];

  const ToArticle = (title) => {
    navigate("/Article", { state: { title: title } });
  };
  return (
    <div>
      <div className={classes.HomeTitle}>
        <h1> HELP CENTER</h1>
        <p> If you can't find the answer to your question you can </p>
        <Link to="/UserChatLogin" target="_blank">
          <button className={classes.GoChatButton}>
            Chat with an operator
          </button>
        </Link>
      </div>

      <div className={classes.HomeListCont}>
        {templateArticles.map(({ id, title, description }) => (
          <ul key={id} className={classes.HomeItemCont}>
            <div className={classes.ItemData}>
              {" "}
              <h3>{title}</h3>
              <p> {description} </p>
              <button
                className={classes.MoreButton}
                onClick={() => ToArticle(title)}
              >
                Read More
              </button>
            </div>
          </ul>
        ))}

        {templateArticlesplus.map(({ id, title, description }) => (
          <ul key={id} className={classes.HomeItemContPlus}>
            <div className={classes.ItemData}>
              {" "}
              <h3>{title}</h3>
              <p> {description} </p>
              <button
                className={classes.MoreButton}
                onClick={() => ToArticle(title)}
              >
                Read More
              </button>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default HomeList;
