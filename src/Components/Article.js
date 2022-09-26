import { useLocation } from "react-router-dom";
import classes from "./Article.module.css";
import { Link } from "react-router-dom";
const Article = () => {
  const { state } = useLocation();
  const { title } = state;
  return (
    <div className={classes.ArticleContainer}>
      <h1>{title}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. <br />
        <br />
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. <br />
        <br />
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
        sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
        tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.{" "}
        <br />
        <br />
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
        autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
        nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?"{" "}
      </p>
      <div className={classes.ToChat}>
        <p> Still can't find the answer? </p>
        <Link to="/UserChat" target="_blank">
          <button>Chat with and operator</button>
        </Link>
      </div>
    </div>
  );
};

export default Article;
