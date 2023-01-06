import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Banner from "@/components/home/Banner";
import HallFame from "@/components/home/HallFame";
import MobileBanner from "@/components/home/MobileBanner";
import SearchInput from "@/components/home/SearchInput";
import HomeLayout from "@/layouts/HomeLayout";
import SsrAxiosUtils from "@/utils/SsrAxiosUtils";
import useQuery from "@/hooks/useQuery";

function Home(props) {
  const userListQueryKey = "/api/v1/allUser";
  const historyQueryKey = "/api/v1/history";
  const emblemQueryKey = "/api/v1/emblem";

  useQuery({
    queryKey: userListQueryKey,
    queryFn: () => {
      return props.userList;
    },
  });
  useQuery({
    queryKey: historyQueryKey,
    queryFn: () => {
      return props.history;
    },
  });
  useQuery({
    queryKey: emblemQueryKey,
    queryFn: () => {
      return props.emblem;
    },
  });

  return (
    <Wrapper>
      <BannerWrapper>
        <Banner></Banner>
        <MobileBanner></MobileBanner>
      </BannerWrapper>
      <SearchInput userList={props.userList}></SearchInput>
      <HallFameWrapper>
        <HallFame userList={props.userList}></HallFame>
      </HallFameWrapper>
    </Wrapper>
  );
}

export default Home;

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export async function getServerSideProps(context) {
  try {
    let props = {};
    await SsrAxiosUtils.get("/api/v1/userList").then((res) => {
      props.userList = res.data;
    });
    await SsrAxiosUtils.get("/api/v1/history", {
      params: {},
    }).then((res) => {
      props.history = res.data;
    });
    await SsrAxiosUtils.get("/api/v1/emblem", {
      params: {},
    }).then((res) => {
      props.emblem = res.data;
    });
    return { props: props };
  } catch (error) {
    return { props: { error: JSON.stringify(error) } };
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--homeBg);
`;

const BannerWrapper = styled.div`
  max-width: 1080px;
  background-color: var(--homeBg);
`;
const HallFameWrapper = styled.div`
  margin: 30px 0px;
`;
