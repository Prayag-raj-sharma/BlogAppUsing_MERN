import {Box, Typography, styled} from '@mui/material';

const Image = styled(Box) `
    background:  url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;

const Heading = styled(Typography) `
   font-size: 70px;
   color: #FFFFFF;
   line-height: 1;

`;

const SubHeading = styled(Typography) `
   font-size: 20px;
   background: #FFFFFF;
   font-style: chaucer;
`;

const Banner = () => {
    return(
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>~~Key To Change Your World~~</SubHeading>
        </Image>
    )
}

export default Banner;