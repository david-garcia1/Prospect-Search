import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
const [savedUsers, setSavedUsers] = useState<Candidate[]>([]);

useEffect(() => {
  const users = JSON.parse(localStorage.getItem("savedUsers") || "[]");
  setSavedUsers(users);
},[] );

const deleteUser = (index: number) => {
  const updateUsers = savedUsers.filter((_, i) => i !== index);
  setSavedUsers(updateUsers);
localStorage.setItem("savedUsers", JSON.stringify(updateUsers))

}

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedUsers.length > 0 ? (
  savedUsers.map((user, index) => (
    <div key={index} className="p-4 border-b border-gray-300">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url || 'https://via.placeholder.com/150'}
          alt="profile picture"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold">{user.login}</p>
        </div>
      </div>
      <button
        onClick={() => deleteUser(index)}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  ))
) : (
  <p>No users yet</p>
)}

    
    
    </div>
  );
};

export default SavedCandidates;
