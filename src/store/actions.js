import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context,payload) {
    // 判断是否有已经这个商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 如果已经有了这个商品， 数量+1，没有就push进去
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }
}