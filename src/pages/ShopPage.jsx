import { useState } from "react"
import axios from "axios"

import FormWrapper from "../components/shop/FormWrapper"
import PrdWrap from "../components/shop/PrdWrap"

export default function ShopPage() {
  const [prdList, setPrdList] = useState([])
  const [searchList, setSearchList] = useState([])
  const onGetPrd = async () => {
    const { data } = await axios.get("/mock/prd.json")
    setPrdList(data?.list || [])
    setSearchList(data?.list || [])
  }
  const onResetPrd = () => {
    setPrdList([])
    setSearchList([])
  }
  const onChangeSearch = (search) => {
    if (search === "") {
      setSearchList(prdList)
    } else {
      const searchedList = prdList.filter((prd) => {
        return (
          prd.title.toLowerCase().includes(search.toLowerCase()) ||
          prd.description.toLowerCase().includes(search.toLowerCase())
        )
      })
      setSearchList(searchedList)
    }
  }
  return (
    <div className="containers">
      <FormWrapper onGetPrd={onGetPrd} onResetPrd={onResetPrd} onChangeSearch={onChangeSearch} />
      <div className="prd-wrapper">
        {searchList.map((prd, idx) => (
          <PrdWrap key={idx} img={prd.img} title={prd.title} description={prd.description} />
        ))}
      </div>
    </div>
  )
}
