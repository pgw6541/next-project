const { MongoClient, ServerApiVersion } = require('mongodb');
// 비밀번호 숨기기 기능 만들기
const uri = "mongodb+srv://admin:rjsdn83@cluster0.2wnrtdf.mongodb.net/?retryWrites=true&w=majority";

const connectDB = new MongoClient(uri, {
  // 서버api 알아보기
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await connectDB.connect();
    await connectDB.db("admin").command({ ping: 1 });
    console.log("MongoDB에 성공적으로 연결되었습니다.");
  } finally {
    await connectDB.close();
  }
}
run().catch(console.dir);

export { connectDB }