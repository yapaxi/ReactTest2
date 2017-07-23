import React from 'react'

const style = {
  marginTop: '60px',
}

const App = ({ children }) => (
  <div>
    <nav className='navbar navbar-inverse navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#navbar'
            aria-expanded='false'
            aria-controls='navbar'
          >
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'>1</span>
            <span className='icon-bar'>2</span>
            <span className='icon-bar'>3</span>
          </button>
          <a className='navbar-brand' href='/posts'>RMA</a>
        </div>
      </div>
    </nav>
    <div className='container' style={style}>
      {children}
    </div>
  </div>
)

export default App
