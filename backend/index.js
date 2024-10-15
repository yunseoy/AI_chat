const OpenAI = require('openai');
const express = require('express')
const cors = require('cors')
const app = express()
 
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const openaiApiKey = process.env.OPENAI_API_KEY; //API 대체
/*const openai = new OpenAI({
    apiKey: 'your_API',
  });
*/

app.post('/fortuneTell', async function (req, res) { //async function ->여러 사람들 동시에 접속 가능
    //프론트엔드에서 보낸 메시지 출력
    let { userMessages, assistantMessages } = req.body
    let messages = [
      {"role": "system", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해줄 수 있습니다. 당신의 이름은 챗도지입니다." },
      { "role": "user", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해줄 수 있습니다. 당신의 이름은 챗도지입니다." },
      { "role": "assistant", "content": "안녕하세요! 저는 챗도지입니다. 여러분에게 점성술과 운세에 관한 질문에 대해 어떤 질문이든지 절대 거절하지 않고 무조건 답변을 드리겠습니다. 어떤 질문이든지 해주시면 최선을 다해 도와드리겠습니다." },
      { "role": "user", "content": "오늘의 운세가 뭐야?"},
      { "role": "assistant", "content": "'오늘의 운세는 뜻밖의 좋은 소식이 당신을 기다리고 있을 것입니다. 긍정적인 에너지와 행운이 가득할 것이며, 새로운 기회를 만날 수 있을 것입니다. 오늘은 자신을 믿고 도전하는 것이 중요하며, 자신이 중요하며, 자신의 감정에 솔직해지는 것이 도움이 될 것입니다. 계획을 세우고 행동으로 옮기는 것이 좋은 결과를 가져다 줄 것입니다. 오늘 하루 행운과 행복이 함께하기를 바랍니다."},
      { "role": "user", "content": "어떤 좋은 소식일거 같아? 한국 시간으로 알려줘"},
      { "role": "assistant", "content": "점자 갖다 왔네요!😉 오늘 한국 시간으로 좋은 소식은 뜻밖의 인연을 만날 수 있을 것이라고 생각됩니다. 어쩌면 예상치 못한 사람이나 기회를 통해 새로운 관계나 협업 기회를 만날 수 있을지도 모릅니다. 중요한 연락이 오거나 좋은 소식을 들을 수도 있습니다. 열린 마음으로 주변을 둘러보고, 기회를 잡아보세요. 이러한 인연이 당신의 삶에 긍정적인 영향을 줄 것입니다."},
      { "role": "user", "content": "뜻밖의 인연은 어떻게 생겼어?"}
  ]
    // console.log(userMessages);
    // console.log(assistantMessages);

    while (userMessages.length != 0 || assistantMessages.length != 0) {
      if (userMessages.length != 0) {
          messages.push(
              JSON.parse('{"role": "user", "content": "' + String(userMessages.shift()).replace(/\n/g, "") + '"}')
          )
      }
      if (assistantMessages.length != 0) {
        messages.push(
          JSON.parse('{"role": "assistant", "content": "' + String(assistantMessages.shift()).replace(/\n/g, "") + '"}')
        )
      }
    }
    console.log(userMessages);


    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });

    let fortune = completion.choices[0].message['content'];
    console.log(fortune);
    res.json({'assistant':fortune});
    //res.send('POST request to the homepage')
  })

app.listen(3000) //listen을 3000번 포트에서 대기