## 使用方法

``var board = new payBoard()`` 
``board.show()``

#### 方法

|  |  |
|:-------------:|:-------------|
| board.show(duration) | 显示输入框       |
|  ``duration(可选):``  | 时间（默认200ms）|

| board.hide(duration) | 隐藏输入框       |
|  ``duration(可选):``  | 时间（默认200ms）|


| board.on(name, fn) | 显示输入框       |
|  ``name(可选):``  | 事件名 |
|  ``fn(可选):``  | 回调函数 |

| board.reset() | 重置输入框       |

| board.input(num) | 程序输入数字       |
|  ``num(必填):``  | 要输入的数字|

| board.delete(num) | 删除数字       |
|  ``num(可选):``  | 要删除的位数|




#### 事件

|  |  |
|:-------------:|:-------------|
| [users/mobile/put](#users-mobile-put) | 上传用户手机号 |


#### 属性

* #### users/mobile

---

获取用户手机号

##### 是否需要权限验证

---

是

##### 请求参数

---

| | 必选 | 类型 | 说明 |
|:-------------:|:-------------|:-------------|
| userId | true | int | 用户ID |

##### 请求方法

---

GET

##### 调用样例

---


` ``
users/mobile?userId=214
` ``

作者：luke93
链接：https://github.com/lllluke1993/payBoard
來源：github
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
