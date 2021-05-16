import { readWishList } from "../Utils/firebase";

const WishList = () => {
  const getWishListData = async () => {
    const wishListData = await readWishList();
    console.log(wishListData);
  };
  getWishListData();
  return "a";
};

export default WishList;
