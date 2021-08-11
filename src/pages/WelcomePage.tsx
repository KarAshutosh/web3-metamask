import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useWeb3React } from '@web3-react/core'
import { injectedConnector } from '../web3/injector-connector'
import Web3 from 'web3'
import { MainButton } from '../components/Buttons'
import PageContainer from '../components/layout/PageContainer'
import LoadingPanel from '../components/LoadingPanel'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  text: {
    marginTop: theme.spacing(2),
  },
  logo: {
    width: '50%',
  },
}))

const redirectPathOnConnect = '/list'

const WelcomePage: React.FC = () => {
  const classes = useStyles()

  const history = useHistory()
  const { activate, active } = useWeb3React<Web3>()

  const [isLoading, setLoading] = useState(false)
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false)

  useEffect(() => {
    if (active && redirectOnSuccess) {
      history.push(redirectPathOnConnect)
    }
  }, [history, active, redirectOnSuccess])

  const handleStart = () => {
    if (active) {
      history.push(redirectPathOnConnect)
      return
    }
    setLoading(true)
    setRedirectOnSuccess(true)
    activate(injectedConnector).finally(() => setLoading(false))
  }

  return (
    <PageContainer className={classes.container}>
      <img
        src={'/images/metamask-fox.svg'}
        alt={'logo'}
        className={classes.logo}
      />
      <Typography align="center" variant={'h5'}>
        Crypto address book
      </Typography>
      <Typography align="center" variant={'body1'} className={classes.text}>
        The easiest and quickest way to manage and pay your contacts. Connect
        your wallet to begin.
      </Typography>
      <LoadingPanel isLoading={isLoading} message={'connecting to wallet'}>
        <MainButton onClick={handleStart}>Connect Wallet</MainButton>
      </LoadingPanel>
    </PageContainer>
  )
}

export default WelcomePage
