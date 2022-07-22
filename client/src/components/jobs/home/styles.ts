import React from "react";

const forCard = {
    margin: '0 10px 10px',
    maxWidth: 555,
    height: 325,
    width: "100%"
}

const onDescription = {
    display: 'flex',
    margin: "0 0 8px",
    padding: '0 0 5px',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
} as React.CSSProperties

const info = {
    display: 'block',
    textAlign: 'left',
} as React.CSSProperties

const infoTop = {
    fontWeight: "bold",
}
const infoBot = {
    margin: 0,
    fontWeight: "lighter",
    fontSize: 13
}

const paginationPage = {
    maxWidth: 1180,
    padding: "0 10px",
    width: "100%",
    height: '100%',
    margin: '20px auto',
    flexWrap: 'wrap',
    display: 'flex',
} as React.CSSProperties

const forPagination = {
    margin: '10px auto',
    fontSize: 15,
    textAlign: "center",
} as React.CSSProperties

const forTags = {
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
    listStylePosition: 'inside',
    padding: 0,
} as React.CSSProperties

const forTagsItem = {
    float: 'left',
    margin: '0 10px 10px 0',
    padding: '0 10px',
    background: '#69C17E',
    borderRadius: '10px'
} as React.CSSProperties

const forButton = {
    width: 100,
    height: 30,
    margin: '0 10px 10px',
    background: '#03C04A',
    color: 'white'
}
const forFilters = {
    maxWidth: 1180,
    padding: "0 10px",
    width: "100%",
    height: '100%',
    margin: '20px auto',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'end'
} as React.CSSProperties

export {
    forCard,
    onDescription,
    info,
    infoTop,
    infoBot,
    paginationPage,
    forPagination,
    forTags,
    forTagsItem,
    forButton,
    forFilters
};
