const mongoose = require("mongoose")

mongoose.connect(
  "mongodb+srv://gannuakshithareddy_db_user:Akshitha0909@cluster0.95xabdv.mongodb.net/smartleads?retryWrites=true&w=majority&appName=Cluster0"
)

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    status: String,
    source: String,
  },
  {
    timestamps: true,
  }
)

const Lead = mongoose.model(
  "Lead",
  leadSchema
)

const names = [
  "Rahul",
  "Akhil",
  "Priya",
  "Sneha",
  "Vikram",
  "Anjali",
  "Rohit",
  "Kiran",
  "Meena",
  "Suresh",
]

const statuses = [
  "New",
  "Contacted",
  "Qualified",
  "Lost",
]

const sources = [
  "Website",
  "Instagram",
  "Referral",
]

async function seedLeads() {
  try {
    for (let i = 1; i <= 50; i++) {
      const lead = new Lead({
        name:
          names[
            Math.floor(
              Math.random() *
                names.length
            )
          ] +
          " " +
          i,

        email: `user${i}@gmail.com`,

        status:
          statuses[
            Math.floor(
              Math.random() *
                statuses.length
            )
          ],

        source:
          sources[
            Math.floor(
              Math.random() *
                sources.length
            )
          ],
      })

      await lead.save()
    }

    console.log(
      "50 leads inserted successfully"
    )

    process.exit()
  } catch (error) {
    console.log(error)

    process.exit()
  }
}

seedLeads()