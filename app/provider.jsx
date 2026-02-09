import React, { useEffect, useState } from 'react';
import {api} from '@/convex/_generated/api';
import { useUser } from '@stackframe/stack';
import { useMutation } from 'convex/react';
import { UserDetailContext } from './context/UserDetailContext';

function Provider({children}) {

    const user=useUser();
    const createNewUserMutation = useMutation(api.users.CreateNewUser);
    const [userDetail,setUserDetail]=useState(null);

    useEffect(() => {
        user && CreateUser();
    }, [user])

    const CreateUser = async() => {
        const data={
            name: user?.displayName || user?.primaryEmail?.split('@')[0] || "Anonymous",
            email: user?.primaryEmail,
        }
        if(user?.profileImageUrl) {
            data.picture = user.profileImageUrl;
        }
        const result= await createNewUserMutation(data);
        console.log(result);
        setUserDetail(result);
    }
  return (
    <div>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      {children}
      </UserDetailContext.Provider>
    </div>
  )
}

export default Provider
