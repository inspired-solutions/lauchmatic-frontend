/* eslint camelcase: 0 */ //

import React, { useState } from 'react'
import { Button, KIND, SHAPE } from 'baseui/button'
import { H3 } from 'baseui/typography'
import { Input } from 'baseui/input'
import { TriangleUp } from 'baseui/icon'
import Router from 'next/router'
////////////////////////////////////////////////////////////////////////////////////////////////////
import { useStyletron } from 'baseui'
////////////////////////////////////////////////////////////////////////////////////////////////////
import authService from '@services/auth.service'
////////////////////////////////////////////////////////////////////////////////////////////////////

function LoginPage() {
  const [css] = useStyletron()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    try {
      // const { token, is_superuser, id } = await fetch(
      //   'http://launchmatic-backend.inspiredsolutions.pe/api/login/',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       // 'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //     body: {
      //       username,
      //       password,
      //     },
      //   }
      // )

      const { token, is_superuser, id } = await authService.login({ username, password })
      localStorage.setItem('token', token)
      localStorage.setItem('userId', id)
      if (is_superuser) {
        Router.push('/admin')
      } else {
        Router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '400px',
      })}
    >
      <H3>Sign in</H3>
      <Input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        endEnhancer={<TriangleUp size="18px" />}
        overrides={{
          Root: {
            style: {
              width: 200,
            },
          },
        }}
      />
      <Input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        overrides={{
          Root: {
            style: {
              width: 200,
            },
          },
        }}
      />
      <Button onClick={handleSubmit} shape={SHAPE.pill} kind={KIND.secondary} disabled={loading}>
        Sign in
      </Button>
    </div>
  )
}

export default LoginPage
