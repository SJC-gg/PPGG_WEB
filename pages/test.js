import styled from "@emotion/styled";
import axios from "axios";
import champions from "lol-champions";
import React, { useEffect, useState } from "react";
import Axios from "@/api/index";

function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n);
  });
}

function Test(props) {
  console.log(props);

  useEffect(() => {
    test();
    axios
      .get("/api/test", {
        params: {},
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  const test = async () => {
    Axios.get("/api/v1/allUser");
    await delay(1000);
    Axios.get("/api/v1/history");
    await delay(1000);
    Axios.get("/api/v1/emblem");
  };

  useEffect(() => {
    // getDate();
    console.log(champions);
  }, []);

  const getDate = async () => {
    // user 조회 API 호출
    const tmpUserList = await Axios.get("/api/v1/user", {
      params: {},
    }).then((res) => {
      return res.data;
    });

    // history 조회 API 호출
    const tmpHistory = await Axios.get("/api/v1/history").then((res) => {
      return res.data;
    });

    // 통계
    tmpUserList.map((user) => {
      let totalDeal = 0; // 적에게 가한 피해량
      let winPoints = 0; // 승리 횟수
      let losePoints = 0; // 패배 횟수
      tmpHistory.map((history) => {
        if (history.winnerId === user.id) {
          totalDeal += history.winnerScore;
          winPoints++;
        } else if (history.loserId === user.id) {
          totalDeal += history.loserScore;
          losePoints++;
        }
      });
      console.log({
        id: user.id,
        totalDeal: totalDeal,
        winPoints: winPoints,
        losePoints: losePoints,
        winRate: (winPoints / (winPoints + losePoints)) * 100,
      });
    });

    // 전적
    tmpUserList.map((user) => {
      let list = [];
      let opponents = "";

      tmpHistory.map((history) => {
        let kill = 0;
        let death = 0;
        if (history.winnerId === user.id) {
          kill = history.winnerScore;
          death = history.loserScore;
          opponents = history.loserId;
        } else if (history.loserId === user.id) {
          kill = history.loserScore;
          death = history.winnerScore;
          opponents = history.winnerId;
        } else {
          return false;
        }

        list.push({
          kill: kill,
          death: death,
          opponents: opponents,
        });
      });
      console.log(user.id, list);
    });
  };

  return (
    <Wrapper>
      {/* {url && <Image src={userList[0].imgUrl} alt="profile" width={30} height={30}></Image>} */}
    </Wrapper>
  );
}

export default Test;

export async function getServerSideProps(context) {
  try {
    const result = await axios
      .get("https://ppgg.vercel.app/api/test", {
        params: {},
      })
      .then((res) => {
        console.log(res);
        return res.data;
      });

    return { props: { result: result } };
  } catch (error) {
    console.log(error);
    return { props: { message: "server error" } };
  }
}

const Wrapper = styled.div``;
