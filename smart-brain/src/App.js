import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";
import React, { useEffect, useState } from "react";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const USER_ID = "user_ID";
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = "PAT";
const APP_ID = "APP_ID";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

function App() {
  //UseSate

  const [input, setInput] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setisSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {

    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const handleChange = (count) => {
   // console.log(user);
    setUser({
      id:user.id,
      name: user.name,
      entries: count.entries,
    });
  };
  //server connection checking
  /*  useEffect(()=> {
    fetch('http://Localhost:3001/')
    .then(response => response.json())
    .then(console.log)
  },[]); */

  //Event Functions

  const calculateFaceLocation = (data) => {
    //  const clarifaiFace = res.outputs[0].data[0]..data.regions[0].region_info.bounding_box;

    const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0]
      .region_info.bounding_box;

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  //input event
  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const ID = user.id;
  //Button click Event
  const onButtonSubmit = () => {
    setImgURL(input);
    
    //another method in clarifai site
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imgURL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          console.log(user);
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id:ID,
            })
          })
            .then((response) => response.json())
            .then((count) => {
              handleChange(count);
            })
            .catch((error) => console.log("error", error));

        }
        displayFaceBox(calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setisSignedIn(false);
    } else if (route === "home") {
      setisSignedIn(true);
    }

    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg type="fountain" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imgURL={imgURL} />
        </div>
      ) : route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
