import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Loading from "@/components/common/Loading";
import Axios from "@/api/index";
import useClickOutside from "@/hooks/useClickOutside";
import useDebounce from "@/hooks/useDebounce";

function SearchInput(props) {
  const router = useRouter();
  const ref = useRef(null);
  const [searchWord, setSearchWord] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  const getUserList = useDebounce(async (name) => {
    setIsLoading(true);
    let tmpUserList = await Axios.get("/api/v1/user", {
      params: { name: name },
    }).then(async (res) => {
      return res.data;
    });

    await Promise.all(
      tmpUserList.map((user) =>
        Axios.get("/api/v1/tier", {
          params: { id: user.id },
        }).then((res) => {
          user.tier = res.data.tier;
        })
      )
    );
    setIsLoading(false);
    setUserList(tmpUserList);
  }, 300);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userList.length > 0) {
      router.push(`/players/${userList[0].id}`);
    }
  };

  return (
    <Wrapper ref={ref} width={props.width}>
      <InputContainer>
        <Title>Search</Title>
        <Input
          type="text"
          value={searchWord}
          placeholder="소환사명"
          onChange={(e) => {
            const { value } = e.target;
            setSearchWord(value);
            getUserList(value);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyUp={handleKeyPress}
        ></Input>
      </InputContainer>
      <GG>.GG</GG>
      {(() => {
        if (isLoading) {
          return (
            <ListContainer>
              <Loading margin="10px auto"></Loading>
            </ListContainer>
          );
        } else {
          if (isOpen) {
            if (searchWord && userList.length === 0) {
              return (
                <ListContainer>
                  <ListBox>
                    <TextBox>
                      <SubText>유저가 존재하지 않습니다.</SubText>
                    </TextBox>
                  </ListBox>
                </ListContainer>
              );
            } else {
              return (
                <ListContainer>
                  {userList.map((user, key) => (
                    <ListBox
                      key={key}
                      onClick={() => {
                        router.push(`/players/${user.id}`);
                      }}
                    >
                      <ImageBox>
                        <Image
                          src={user.imgUrl}
                          width={36}
                          height={36}
                          alt="profileImg"
                        ></Image>
                      </ImageBox>
                      <TextBox>
                        <Text>{user.name}</Text>
                        <SubText>{user.tier}</SubText>
                      </TextBox>
                    </ListBox>
                  ))}
                </ListContainer>
              );
            }
          }
        }
      })()}
    </Wrapper>
  );
}

export default SearchInput;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 800px;
  width: 80%;
  height: 60px;
  padding: 0px 32px;
  margin: 0px 32px;
  border-radius: 30px;
  background-color: var(--textBox);
  & * {
    background-color: var(--textBox);
  }
`;
const InputContainer = styled.div`
  width: 100%;
  margin: 0px 8px;
`;
const Input = styled.input`
  font: var(--body14);
  width: 100%;
  caret-color: var(--brandColor);
`;
const Title = styled.p`
  font: var(--body14);
`;
const GG = styled.div`
  color: var(--brandColor);
  font-size: 24px;
  font-weight: 900;
`;
const ListContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 32px;
  max-width: 800px;
  width: calc(100% - 64px);
  background-color: var(--textBox);
`;
const ListBox = styled.div`
  display: flex;
  height: 50px;
  padding: 6px 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--icon1);
  }
  & * {
    background-color: inherit;
  }
`;
const ImageBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 16px;
  overflow: hidden;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Text = styled.p`
  font: var(--body14);
`;
const SubText = styled.p`
  font: var(--caption12);
  color: var(--sub);
`;
