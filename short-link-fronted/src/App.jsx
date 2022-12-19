import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Delete from './components/Delete'
import Pause from './components/Pause'
import Update from './components/Update'

export default class App extends Component {
    render() {
        return (
            <div>
                <Nav></Nav>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/delete" exact element={<Delete />} />
                    <Route path="/pause" exact element={<Pause />} />
                    <Route path="/update" exact element={<Update />} />
                </Routes>
            </div>
        )
    }
}
