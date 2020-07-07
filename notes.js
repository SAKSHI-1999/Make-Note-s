const fs = require('fs')
const chalk = require('chalk')
const getNotes =()=> {
    return 'Your Notes....'
}
const addNote =(title,body)=>{
    const notes=loadNotes()
    const duplicate=notes.filter((note) => note.title === title)
    if(duplicate.length===0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added'))
    }
    else{
        console.log(chalk.red.inverse('Note Title Already Taken!'))

    }
}
const saveNotes =(notes)=>{
    const datajson=JSON.stringify(notes)
    fs.writeFileSync('notes.json',datajson)
}
const loadNotes=()=>{
    try{
       const databuffer=fs.readFileSync('notes.json')
       const dataJson=databuffer.toString()
       return JSON.parse(dataJson)
    }
    catch(e){
        return []
    }
}
const listnote=()=>{
    const notes=loadNotes()
    console.log(chalk.white.inverse("Your Notes Title are listed Below - "))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readnote=(title)=>{
    const notes=loadNotes()
    const note= notes.find((note)=> note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)

    }
    else{
        console.log(chalk.red.inverse('Note Title not found'))

    }
}

const removeNote =(title)=>{
    const notes=loadNotes()
    const notestokeep=notes.filter((note) => note.title !== title)

    if(notes.length>notestokeep.length)
    {
        console.log(chalk.green.inverse('Note Removed:'))
        saveNotes(notestokeep)
    }
    else
    {
        console.log(chalk.red.inverse('No Note Removed'))
    }
}

module.exports={
    getNotes: getNotes,
    addNote:  addNote,
    removeNote: removeNote,
    listnote: listnote,
    readnote: readnote
}