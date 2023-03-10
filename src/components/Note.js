// http://localhost:3000/note/01oml96ux6g5tri80zav7xw6
// note позволяет принять расшифровать показать сообщение, проанализировать есть ли такое сообщение  
// когда юзер вводит этот адрес, реакт направляет на компонент note, в котором нужн послать запрос на сервер, получить ответ, после отрисовать страницу

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import env from '../env.json';



function Note() {
    let { noteURL } = useParams()// notUrl попадет прилетевшая чатсь 01oml96ux6g5tri80zav7xw6
    const [noteText, setNoteText] = useState('');    
    const [lineClass, setLineClass] = useState('hide');    
    const [formClass, setFormClass] = useState('hide');
    const [errorClass, setErrorClass] = useState('hide');

    useEffect(() => {
        if (noteURL !== undefined) {
            fetch(env.urlBackend, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({ "url": noteURL })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.result) {
                        setNoteText(response.note);
                        setLineClass('');
                        setFormClass('hide');
                        setErrorClass('hide');

                    }
                    else if (!response.result) {
                        setLineClass('hide');
                        setFormClass('hide');
                        setErrorClass('');
                    }
                }
                )
        }
        else {
                setLineClass('hide');
                setFormClass('');
                setErrorClass('hide');

        }
    }, []);
    function getNote(event) {
        event.preventDefault();
        let url = event.target.elements.url.value;
        url = url.trim();
         if (url === '') {
            alert('Заполните поля');
            return false;
        }
        noteURL = url;
        window.location.href = env.url + '/' + url;
    }
    
    return (
        <div>
            <div className={lineClass}>
                <h4>Note: </h4>
                <div>{noteText} </div>
            </div>
            <div className={errorClass}>
                <p>Произошла ошибка. Note не найден!</p>
            </div>
            <div className={formClass}>
                <form action="" onSubmit={getNote}>
                <label htmlFor="">Введите hash заметки</label>
                <input type="text" name="url" id="url" className="form-control" />
                <button type="submit" className="btn btn primary">Search Note</button>
                    </form>
            </div>
        </div>
    );
}

export default Note;