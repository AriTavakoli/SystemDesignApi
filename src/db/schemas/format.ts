
// let format = {

//   //TODO ::Question format
// /// answers
//   {
//   id: '1',
//     question_id: '36',
//       body: 'Supposedly suede, but I think its synthetic',
//         date_written: '1599958385988',
//           answerer_name: 'sillyguy',
//             answerer_email: 'first.last@gmail.com',
//               reported: '0',
//                 helpful: '1'
// },
// //photos
// {
//   id: '1',
//     answer_id: '5',
//       url: 'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80'
// },
// //questions
// {
//   id: '1',
//     product_id: '1',
//       body: 'What fabric is the top made of?',
//         date_written: '1595884714409',
//           asker_name: 'yankeelover',
//             asker_email: 'first.last@gmail.com',
//               reported: '0',
//                 helpful: '1'a
// }

// {
//   "products": {
//     "1": {
//       "questions": {
//         "101": {
//           "body": "Question body...",
//             "date_written": "2023-03-16",
//               "asker_name": "John Doe",
//                 "asker_email": "john@example.com",
//                   "reported": false,
//                     "helpfulness": 3,
//                       "answers": {
//             "1001": {
//               "body": "Answer body...",
//                 "date": "2023-03-16",
//                   "answerer_name": "Jane Doe",
//                     "answerer_email": "jane@example.com",
//                       "helpfulness": 5,
//                         "reported": false,
//                           "photos": {
//                 "10001": {
//                   "url": "https://example.com/photo1.jpg"
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }



// }

// [{ '$group': { '_id': '$question_id', 'documents': { '$push': '$$ROOT' } } }, { '$addFields': { 'question_id': '$_id', '_id': { '$toString': '$_id' } } }, { '$project': { '_id': 0 } }, {
//   '$addFields': {
//     'documents': {
//       '$map': {
//         'input': '$documents', 'as': 'doc', 'in': {
//           '$mergeObjects': ['$$doc', {
//             'photos': {
//               '$filter': {
//                 'input': '$photos', 'cond': {
//                   '$eq': ['$$this.answer_id', '$$doc._id']
//                 }
//               }
//             }
//           }
//           ]
//         }
//       }
//     }
//   }
// },
// {
//   '$addFields': {
//     'documents': {
//       '$map': {
//         'input': '$documents',
//         'as': 'doc',
//         'in': {
//           '$cond': [
//             { '$eq': ['$$doc.id', '$$doc.answer_id'] },
//             {
//               'id': '$$doc.id',
//               'question_id': '$$doc.question_id',
//               'body': '$$doc.body',
//               'date_written': '$$doc.date_written',
//               'answerer_name': '$$doc.answerer_name',
//               'answerer_email': '$$doc.answerer_email',
//               'reported': '$$doc.reported',
//               'helpful': '$$doc.helpful',
//               'photos': '$$doc.photos'
//             },
//             '$$doc'
//           ]
//         }
//       }
//     }
//   }
// }
// ]
