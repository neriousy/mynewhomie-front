import React, {useState} from 'react';
import { useSearch } from '../hooks/useSearch';
import { Box, Button, Grid, Modal, Pagination, Stack } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import { useEffect } from 'react';
import GridResult from './GridResult/GridResult';
import RowResult from './RowResult/RowResult';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../hooks/useUser';
import { search } from '../../../hooks/useUserInfo';
import SearchProfileSpecific from '../../SearchProfileSpecific/SearchProfileSpecific';
import SearchProfile from '../../../layout/SearchProfile/SearchProfile';

function Searchv2Reults({data}){

  const [activeButton, setActiveButton] = useState(1);
  const[openSpecific, setOpenSpecific] = useState(false);
  const[specificData, setSpecificData] = useState({});
  const [current, setCurrent] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);


  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  const handlePostPerPage = (e) => {
    setPostsPerPage(e.target.value);
    setCurrentPage(1);
  };

  

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const closeSpecific = () => {
    setOpenSpecific(false);
  };

  const openSpecificFunc = async (id) => {
    new Promise((resolve, reject) => {
      resolve(setCurrent(id));
    }).then(() => {
      setOpenSpecific(true);
    });

  
  };




  return(
    <Box sx={{}}>
      <Box sx={{
        mt: '-3rem',
        '@media (max-width: 600px)': {
          mt: '0'
        }
      }}>
        <Button
          sx={{
            minWidth: 'unset',
            color: activeButton === 1 ? '#646465' : '#88888F',
            width: '1,75rem',
            height: '1,75rem',

          }}
          onClick={() => handleButtonClick(1)}

        >
          <GridViewIcon sx={{fontSize: '1.75rem'}} />
        </Button>

        <Button
          sx={{
            minWidth: 'unset',
            color: activeButton === 2 ? '#646465' : '#88888F',
          }}
          onClick={() => handleButtonClick(2)}

        >
          <ViewAgendaOutlinedIcon  sx={{fontSize: '1.75rem'}}/>
        </Button>
      </Box>
      
      {data?.length !== 0 ?
      
        activeButton === 1 ? (
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>

            <Pagination count={Math.ceil(data.length / postsPerPage)} page={currentPage} onChange={handlePage} size="large" />

            <Grid container spacing={4} sx={{mt: 1}} columns={{ xs: 4, sm: 8, md: 16 }}>
              {currentPosts?.map((item) => (
                <Grid item xs={2} sm={4} md={4} key={item.id}>
                  <GridResult data={item} openSpecificFunc={openSpecificFunc}/>
                </Grid>
              ))}
            </Grid>
          </Box>)
          : 
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Pagination count={Math.ceil(data.length / postsPerPage)} page={currentPage} onChange={handlePage} size="large" />
            
            <Stack sx={{
              width: '100%',
              mt: 4,
              borderRadius: '10px',
              backgroundColor: 'white',
              boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);'
            }}>
              {currentPosts?.map((item, index) => (
                <RowResult key={index} data={item} openSpecificFunc={openSpecificFunc} />
              ))}

            </Stack>
          </Box>
        : <></>
      }

      <Modal
        open={openSpecific}
        onClose={closeSpecific}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{  position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          width: '70vw',
          height: '80vh',
          p: '24px 0 24px 24px',
          boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
          borderRadius: '4px',
          overflow: 'hidden',
          '@media (max-width: 600px)': {
            width: '100%',
            maxWidth: '100%',
          }
        }}>
          <Button sx={{
            position: 'fixed',
            right: '10px',
            top: '10px',
            height: '30px',
            width: '30px',
            p: 0,
            borderRadius: '0',
            minWidth: 'unset',
          }}
          onClick={closeSpecific}
          >
            <CloseIcon sx={{color: '#000' }} />
          </Button>

          {
            current === 0 ? <></> :
            
              <SearchProfile id={current} />

          }


        </Box>
      </Modal>

      

    </Box>
  );
}

export default Searchv2Reults;