import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);

  function handleToggle(event) {
    fetch("https://api.github.com/users/nddudash", { method: "GET" })
      .then((response) => response.json())
      .then((userObject) => setUser(userObject))
      .then(setActive(!active));
  }

  let userCard;
  active && user
    ? (userCard = (
        <Card className="userCard" style={{ width: `33%` }}>
          <Card.Img
            className="userCardAvatar"
            src={user.avatar_url}
            alt="user_avatar"
          />
          <Card.Title className="userCardTitle">{user.login}</Card.Title>
          <Card.Footer className="userCardFooter">
            <div className="userCardRepoCount">
              Repositories: <a href={user.repos_url}>{user.public_repos}</a>
            </div>
            <div className="userCardFollowerCount">
              Followers: {user.followers}
            </div>
          </Card.Footer>
        </Card>
      ))
    : (userCard = null);

  return (
    <div className="App">
      <Button className="toggleButton" onClick={handleToggle}>
        Toggle
      </Button>
      {userCard}
    </div>
  );
}

export default App;
