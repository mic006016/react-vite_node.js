import { useEffect, useState } from "react"
import axios from "axios"
import useSWR from "swr"
import FormWrapper from "../components/shop/FormWrapper"
import PrdWrap from "../components/shop/PrdWrap"

export default function ShopPage() {
  const [searchList, setSearchList] = useState([])

  const { data, error, isLoading, mutate } = useSWR("/shop")

  useEffect(() => {
    if (data?.success === "OK") {
      setSearchList(data?.data?.list || [])
    }
  }, [data])

  // const onGetPrd = async () => {
  //   const { data } = await axios.get("/mock/prd.json")
  //   setPrdList(data?.list || [])
  //   setSearchList(data?.list || [])
  // }
  const onResetPrd = () => {
    setSearchList(data?.data?.list)
  }
  const onChangeSearch = (search) => {
    if (search === "") {
      setSearchList(data?.data?.list || [])
    } else {
      const searchedList = (data?.data?.list || []).filter((prd) => {
        return (
          prd.title.toLowerCase().includes(search.toLowerCase()) ||
          prd.description.toLowerCase().includes(search.toLowerCase())
        )
      })
      setSearchList(searchedList)
    }
  }
  return (
    <div className="containers shop-container">
      <FormWrapper
        onGetPrd={mutate}
        onResetPrd={onResetPrd}
        onChangeSearch={onChangeSearch}
      />
      <div className="prd-wrapper">
        {searchList.map((prd, idx) => (
          <PrdWrap
            key={idx}
            img={prd.img}
            title={prd.title}
            description={prd.description}
          />
        ))}
      </div>
    </div>
  )
}
