import axios from 'axios'

interface DeleteMemberProps {
    memberId: number;
    onDelete: () => void;
  };

export const DeleteMember: React.FC<DeleteMemberProps>= ({memberId, onDelete}) => {
    const handleSubmit = async () => {
    const response = await axios.delete( `http://localhost:3000/members/${memberId}`)
    onDelete();
  };

    return(
    <>
    <button className='absolute bottom-6 left-11 px-4 py-1 bg-slate-700 border-none rounded-xl text-white hover:bg-slate-900 ease-in-out duration-300' 
    onClick={handleSubmit}>Delete Member</button>
    </>
    );
  }


