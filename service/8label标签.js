outer: for(let i = 1;i <= 10; i++)
{
    // console.log('='.repeat(i));
    // console.log('='.repeat(i).padStart(10));
    for(let j = 1;j <= i; j++)
    {
        console.log(i + "," +j);
        // 如果j等于3，那么就跳出outer循环
        if(j === 3)
        {
            break outer;
        }
    }
}