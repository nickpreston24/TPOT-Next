import * as React from "react";
// import React, { useState } from 'react'
// import Link from 'next/link'
// import ReactDOM from "react-dom";
// import { map, startWith, tap } from "rxjs/operators";
// import { combineLatest } from "rxjs";
// import { componentFromStream, createEventHandler } from "recompose";
// import { wp } from "./WordPress/wp";
// import User from "./User";
// import Page from "./WordPress";
// import "./styles.css";
// import "./observableConfig";
// import Dashboard from '@components/Dashboard'
// import { FirebaseUserService } from '@services/firebase'
import { wordpressUserService } from '@services/wordpress'

wordpressUserService.getPagesFromUser(10, 0)
  .then(data => console.log('users  :>> ', data))

// /* Manage both firebase and WP accounts here */
const Account = (
  // wordpressService: WordpressUserService
  // , firebaseUserService: FirebaseUserService

) => {

  return (
    <div>x</div>
  )
}

// export async function getStaticProps() {
//   // const response = wordpressUserService.getUser(10)
// }

// const Account2 = ()=> <div>Chicken Nuggets</div>;

export default Account
