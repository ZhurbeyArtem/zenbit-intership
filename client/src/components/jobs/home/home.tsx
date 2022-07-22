import React from "react";
import {Card, Button, Pagination, Badge} from 'antd';

import {useJobListQuery} from "../homeStore";
import {
    infoBot,
    forCard,
    info,
    onDescription,
    infoTop,
    paginationPage,
    forPagination,
    forTags,
    forTagsItem,
    forButton, forFilters
} from "./styles";
import {getTags} from "./homeHooks";
import {useSelector} from "react-redux";


function  Home() {

  const [page, setPage] = React.useState(1)
      let { data: jobs, isLoading } = useJobListQuery(page);
      const { userRole }  = useSelector((state:any) => state.user.user);
      const employer: string = 'Employer'
  return (
          isLoading ? <h1>Loading</h1>
          : <>
                  {(userRole === employer) &&
                  <div style={forFilters}>
                      <Button href='create/job' style={forButton}>Create</Button>
                      </div>
                  }
                  <div style={paginationPage}>
                      {jobs[0].map(item => (
                          <Card title={item.title} hoverable style={forCard} key={item.id}>
                              <div style={onDescription}>
                                  <div style={info}>
                                      <div style={infoTop}>{item.hourlyRate}</div>
                                      <div style={infoBot}>Hour rate</div>
                                  </div>
                                  <div style={info}>
                                      <div style={infoTop}>{item.duration}</div>
                                      <div style={infoBot}>Time to finish task</div>
                                  </div>
                                  <div style={info}>
                                      <div style={infoTop}>{item.englishLevel}</div>
                                      <div style={infoBot}>English lvl</div>
                                  </div>
                              </div>
                              <p>{item.description.length > 310 ? item.description.substr(0, 310) + '...' : item.description}</p>
                              <div>{item.tagsToJobs[0]
                                  &&
                                  <ul style={forTags}>
                                      {getTags(item).length > 8 ?
                                          getTags(item).slice(0, 8).map(e => <li key={e} style={forTagsItem}>{e}</li>)
                                          : getTags(item).map(e => <li key={e} style={forTagsItem}>{e}</li>)}
                                  </ul>
                                  }
                              </div>
                              <Button type="primary" shape="round" size='small' href={`job/${item.id}`} >
                                  See More
                              </Button>
                          </Card>
                      ))}
                  </div>
                  <Pagination simple defaultCurrent={1} total={jobs[1]} onChange={setPage} style={forPagination}/>
              </>



  )
}

export default Home;
