import React from 'react'
import { Link } from 'react-router-dom'

export default function homepage() {
    return (
        <div>
            <p>homepage works</p>
            <h3>Goto  <Link to='/activities'> Activities</Link></h3>
        </div>
    )
}
