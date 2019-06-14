<script>
export default {
  name: "",
  data() {
    return {
      inputValue:''
    };
  },
  mounted() {
    /************************************************ 数组 *********************************************** */

    console.log("将数组分成指定长度的数组");
    console.log(_.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 3));

    console.log("将数组中值为false的过滤掉");
    console.log(_.compact([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

    console.log("数组拼接,参数是多个数组或值");
    let concat_arr1 = [1, 2, 3];
    console.log(
      _.concat(concat_arr1, [10, 20], [[300, 400, 500]], 6000, 7000, 8000, {
        num: 10000
      })
    );

    console.log(
      "找出数组中的不一样的值，并返回第一个数组中与后面的数组的值不同的一个数组,值需要进行全等比较"
    );
    console.log(
      _.difference(
        [1, 2, false, null, 0, "111"],
        [2, 3, true, undefined, "0", 111]
      )
    );

    console.log("通过一些标准进行两数组的比较，返回结果由第一个数组决定");
    console.log(_.differenceBy([1.2, 3.5], [1.4, 2.2], Math.floor));
    console.log(_.differenceBy([{ x: 1 }, { x: 2 }], [{ x: 2 }], "x"));

    console.log("通过一些标准进行两个数组对象的比较,返回结果为两个比较结果");
    var objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    console.log( _.differenceWith(objects, [{ x: 1, y: 2 }], _.isEqual) );

    console.log("进行数组的删除");
    console.log(_.drop([1, 2, 3, 4] , 3));

    console.log("从右侧进行数组的删除");
    console.log(_.dropRight([1, 2, 3, 4]));

    console.log(_.toInteger(3.6))

    let obj = { a : { b :{ c : 0 } } } ;
    _.update(obj,'a.b.c',function(value){ return value + 10 });
    _.update(obj,'aa.b.c',function(value){ return value + 10 });
    console.log(obj)
  }
};
</script>

<template>
    <div class="">
        <input type="text" v-int v-model="inputValue">
    </div>
</template>

<style   scoped>
</style>