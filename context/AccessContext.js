import React, { createContext, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'

export const AccessContext = createContext()

const AccessContextProvider = ({ children }) => {
  const [platform, setPlatform] = useState('Bongo')

  useEffect(() => {
    // if (isLoggedIn && token) setPayloads(parseJwt(token))
  }, [platform])

  return (
    <AccessContext.Provider
      value={{
        platform,
        setPlatform,
      }}
    >
      {children}
    </AccessContext.Provider>
  )
}
AccessContextProvider.propTypes = {
  children: PropTypes.object,
}
export default AccessContextProvider
