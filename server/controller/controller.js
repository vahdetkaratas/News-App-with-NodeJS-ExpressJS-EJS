var newsModel = require('../model/newsModel');

/* exports.create = (req,res)=>{

    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    const news1 = new newsModel({
        img : req.body.img,
        title : req.body.title,
        subTitle: req.body.subTitle,
        text: req.body.text,
        date : req.body.date
    })

    news1
        .save(news1)
        .then(data => {
            //res.send(data)
            res.redirect('/add-news');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}
 */

exports.create = async (req, res) => {
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: "Dosya yüklenemedi",
        });
      } else {
        let img = req.files.img;
  
        img.mv("./public/files/" + img.name);
  
        //send response
        const data = {
          formText: req.body.textarea,
          formTitle: req.body.title,
          formSubtitle: req.body.subTitle,
          formDate: req.body.date,
          imgName: img.name,
        };
  
        const addPost =  new newsModel({
          img: "http://localhost:3000/files/" + data.imgName,
          title: data.formTitle,
          subTitle: data.formSubtitle,
          date: data.formDate,
          text: data.formText,
        });
        await addPost.save();
         res.redirect("/")
     
    

        //res.status(200).jsonender('list' , {(data)
  
        /*
          res.send({
              status: true,
              message: 'Dosya yüklendi',
              data: {
                  formText:req.body.textarea,
                  formTitle:req.body.title,
                  formSubtitle:req.body.subtitle,
                  formDate:req.body.date,
                  imgName: img.name,
                  //mimetype: img.mimetype
              }
          });*/
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };




exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        newsModel.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : id + " ile kayıtlı haber bulunamadı! "})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message:  id + " ile kayıtlı haber bulunurken hata oluştu!"})
            })

    }else{
        newsModel.find()
            .then(news => {
                res.send(news)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Hata Oluştu!" })
            })
    }

    
}

exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Alanlar boş bırakılamaz"})
    }

    const id = req.params.id;
    newsModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message :  `${id} kodlu haber silinemedi!.Haber ID yanlış olabilir.`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Güncelleme İşlemi Sırasında Hata Oluştu!"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    newsModel.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `${id} kodlu haber silinemedi!.ID yanlış olabilir.`})
            }else{
                res.send({
                    message : "Silme İşlemi Başarılı!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:   id + "kodlu haber silinemedi!"
            });
        });
}

exports.newsApi = async (req, res)=>{

    const getData = await newsModel.find();

    res.status(200).json(getData);

}


/* ;
     this.findOne().skip(rand).exec(callback); */

exports.newsIdApi = async (req, res)=>{

    const id = req.params._id
    const getData = await newsModel.findOne(id)

    res.status(200).json(getData);
}

exports.randomNews = async (req, res)=>{

    var rand = Math.floor(Math.random() * 2);


    const getData = await newsModel.find().skip(rand)

    res.status(200).json(getData);
}
