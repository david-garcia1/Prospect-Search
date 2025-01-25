import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
const [savedUsers, setSavedUsers] = useState<Candidate[]>([]);

useEffect(() => {
  const users = JSON.parse(localStorage.getItem("savedUsers") || "[]");
  setSavedUsers(users);
},[] );


const deleteUser = (index:number) => {
  const updateUsers = savedUsers.filter((_, i) => i !== index);
  setSavedUsers(updatedUsers);
localStorage.setItem("savedUsers", JSON.stringify(updatedUsers))

}

  return (
    <div>
      <h1>Potential Candidates</h1>
    {savedUsers.length > 0 ? savedUsers.map((user, index) => (
      <div key={index}>
        <div>  
          <p>Image</p><img src={user.avatar_url} alt="profile picture"/>
        <div>
        <p>name</p>
        <p>{user.login}</p>
        </div>
        </div>
      <button onClick={() => {deleteUser(index)}}>delete</button>
      </div>
    ))
: 'no users yet '
}

    
    
    </div>
  );
};

export default SavedCandidates;
