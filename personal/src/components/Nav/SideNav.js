import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './SideNav.css';

class SideNav extends Component {
  constructor(){
    super();
    this.state = {
      flags: []
    }
  }

  active(id) {
    let elArray = document.getElementsByClassName('linkActive');
    for (let i = 0; i < elArray.length; i++) {
      elArray[i].classList.remove('linkActive');
    }
    document.getElementById(id).classList.add('linkActive');
  }
  render(){
    const bigpicStyle = {
      backgroundImage: `url(${this.props.userInfo.picture})`
    }
    let name = [];
    if (this.props.userInfo.name){
      name = this.props.userInfo.name.split(' ');
    }
    return(
      <div id='SideNav'>
        <h1>Dashboard</h1>
        <div className='user'>
          <div className='profilePic' style={bigpicStyle}></div>
          <div className='userBlock'>
            <h3 className='border'>Hello, {name[0]}</h3>
            <h3 className='logout' onClick={this.logout}>Logout</h3>
          </div>
          
        </div>
        <div className='tabs'>
          <Link to='/dashboard/media' className={`link ${this.props.history.location.pathname === '/dashboard/media'? 'linkActive' : '' }`}>All Media</Link>
          <Link to='/dashboard/pages' className={`link ${this.props.history.location.pathname === '/dashboard/pages'? 'linkActive' : '' }`}>All Pages</Link>
        </div>
        <h2>Groups</h2>
        <div className='groupsList'>
          {this.props.groups.map((group, i) =>{
            const clsname=`group${i}`;
            return <div key={i}>
              <Link to={`/dashboard/${group.groupid}`} className={`link ${this.props.history.location.pathname === `/dashboard/${group.groupid}`? 'linkActive' : '' }`}>{group.name}</Link>
                {this.props.history.location.pathname.includes(`/dashboard/${group.groupid}`)
                ?
                  <div className='sublinkList'>
                    <Link to={`/dashboard/${group.groupid}/media`} className={`sublink ${this.props.history.location.pathname === `/dashboard/${group.groupid}/media`? 'linkActive' : '' }`}>Media</Link>
                    <Link to={`/dashboard/${group.groupid}/pages`} className={`sublink ${this.props.history.location.pathname === `/dashboard/${group.groupid}/pages`? 'linkActive' : '' }`}>Pages</Link>
                    <Link to={`/dashboard/${group.groupid}/sections`} className={`sublink ${this.props.history.location.pathname === `/dashboard/${group.groupid}/sections`? 'linkActive' : '' }`}>Sections</Link>
                  </div>
                :
                  null
                }
                {this.props.history.location.pathname.includes(`/dashboard/${group.groupid}/sections`)
                ?
                  <div className='subsublinkList'>
                  {this.props.sections.map(section => {
                    if (section.groupid === group.groupid) {
                      return <Link to={`/dashboard/${group.groupid}/sections/${section.id}`} className={`sublink ${this.props.history.location.pathname === `/dashboard/${group.groupid}/sections/${section.id}`? 'linkActive' : '' }`}>{section.name}</Link>
                    }
                  })}
                  </div>
                :
                  null
                }
            </div>
          })}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    userInfo: state.userInfo,
    groups: state.groups,
    sections: state.sections
  }
}
export default withRouter(connect(mapStateToProps)(SideNav));