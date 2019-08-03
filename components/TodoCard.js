import { ToDateTime } from '../utils/intl'

export default ({ todo, onComplete, onDelete }) => (
  <div className="todocard">
    <div className="header">
      <span className="done" onClick={() => onComplete(todo.id, todo.done)}>
        {todo.done ? <i className="fas fa-check-square"></i> : <i className="fas fa-square"></i>}
      </span>
      <span className="name">{todo.name}</span>
      <button onClick={() => onDelete(todo.id)}>Удалить</button>
    </div>
    <div className="footer">
      <span>Создана: {ToDateTime(todo.createdAt)}</span>
      <span>Обновлена: {ToDateTime(todo.updatedAt)}</span>
    </div>
    <style jsx>{`
      .todocard {
        width: 100%;
        box-shadow: 0px 3px 6px rgba(0,0,0,.2);
        padding: .5rem;
        border-radius: 5px;
        margin-bottom: .5rem;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .name {
        flex: 1;
        text-decoration: ${todo.done ? "line-through" : "none"};
        line-height: 1.1;
      }
      .done {
        padding-right: .5rem;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        font-weight: 700;
        padding-top: .5rem;
        color: rgba(0,0,0,.4);
      }
      button {

      }
    `}</style>
  </div>
)