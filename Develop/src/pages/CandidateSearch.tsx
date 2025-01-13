import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
const [randUser, setRandUser] = useState<Candidate[]>([]);

const [currentIndex, setCurrentIndex] = useState(0)
const [currentUser, setCurrentUser] = useState<Candidate | null>(null)
const [noMoreCandidates, setNoMoreCandidates] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try{
      const users = await searchGithub();
      setRandUser(users)

      if( users.length > 0){
        const newUser = await searchGithubUser(users[0].login);
        setCurrentUser(newUser)
      }
    }
    catch(err){
      console.error(err, 'error with use effect')
    }
  };

fetchData();

}, [])

const handleNext = async () => {
  const nextIndex = currentIndex + 1;
  if(nextIndex < randUser.length){
    setCurrentIndex(nextIndex);
    const nextUserName = randUser[nextIndex].login
    try {
    const newUser = await searchGithubUser(nextUserName);
    setCurrentUser(newUser);
    setNoMoreCandidates(false);
    } catch (err){
      console.error(err)
    }
  } else {
    setNoMoreCandidates(true);
  }
}

const handleSave = async () => {
  const savedUsers = Json.parse(localStorage.get("savedUser") || "[]");
  savedUsers.push(currentUser)
  localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
  handleNext();
}

  return (
  <div>
  <h1>CandidateSearch</h1>;

    {currentUser ? (
      <div>
        <h2>{currentUser.login}</h2>
      </div>
      
     ) : (
      ""
    )}

  </div>;
  );
};

export default CandidateSearch;
