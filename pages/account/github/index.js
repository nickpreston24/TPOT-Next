import React from "react";
import { componentFromStream } from "recompose";
import { ajax } from "rxjs/ajax";
import {
    catchError,
    debounceTime,
    filter,
    delay,
    map,
    pluck,
    switchMap
} from "rxjs/operators";
import { of, merge } from "rxjs";
import UserCard from "./UserCard";
import SearchError from "../Error";
import "./User.css";

const gitHubUrl = username => `https://api.github.com/users/${username}`;

const loader$ = of(<h3>Loading...</h3>);

const User = componentFromStream(prop$tream => {
    const user$tream = prop$tream.pipe(
        debounceTime(1000),
        pluck("user"),
        filter(user => user && user.length),
        map(gitHubUrl),
        switchMap(url =>
            merge(
                loader$,
                ajax(url).pipe(
                    pluck("response"),
                    delay(1250),
                    map(UserCard),
                    catchError(error => of(<SearchError {...error} />))
                )
            )
        )
    );

    return user$tream;
});

export default User;
