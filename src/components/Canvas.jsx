import { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

function Canvas() {
  const [cards, setCards] = useState([
    {
      title: "Title",
      text: "This is some dummy text for the card. It will be shortened.",
      showFullText: false,
      editing: false,
      width: 300,
      height: 200,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedCard, setEditedCard] = useState({});
  const handleAddCard = () => {
    setCards([
      ...cards,
      {
        title: `Title ${cards.length + 1}`,
        text: "This is some dummy text for the card. It will be shortened.",
        showFullText: false,
        width: 300,
        height: 200,
      },
    ]);
  };

  const handleShowMore = (index) => {
    setCards(
      cards.map((card, i) => {
        if (i === index) {
          return { ...card, showFullText: true };
        }
        return card;
      })
    );
  };

  const handleShowLess = (index) => {
    setCards(
      cards.map((card, i) => {
        if (i === index) {
          return { ...card, showFullText: false };
        }
        return card;
      })
    );
  };

  const handleEdit = (index) => {
    setModalOpen(true);
    setEditedCard({ ...cards[index], index });
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    const updatedCards = cards.map((card, i) => {
      if (i === editedCard.index) {
        return { ...card, title: editedCard.title, text: editedCard.text };
      }
      return card;
    });
    setCards(updatedCards);
    setModalOpen(false);
  };

  const handleDelete = (index) => {
    setCards(cards.filter((card, i) => i !== index));
  };

  const handleResize = (index, event, { size }) => {
    const updatedCards = cards.map((card, i) => {
      if (i === index) {
        return { ...card, width: size.width, height: size.height };
      }
      return card;
    });
    setCards(updatedCards);
  };
  return (
    <div className="m-10">
      <div className="flex justify-center ">
        <button
          onClick={handleAddCard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
        >
          Add Card
        </button>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3 items-center ">
        {cards.map((card, index) => (
          <ResizableBox
            key={index}
            width={card.width}
            height={card.height}
            minConstraints={[100, 100]}
            maxConstraints={[500, 400]}
            onResize={(e, data) => handleResize(index, e, data)}
          >
            <div
              className="bg-blue-400 p-5 rounded-2xl w-full h-full border border-gray-700 relative"
              style={{ width: "100%", height: "100%" }}
            >
              <div className="flex justify-between">
                <h3 className="font-bold text-2xl">{card.title}</h3>
                <div className="flex gap-5">
                  <button onClick={() => handleDelete(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button onClick={() => handleEdit(index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
              <p className="font-medium">
                {card.showFullText
                  ? card.text
                  : card.text.substring(0, 20) + " ..."}
                {card.showFullText ? (
                  <button
                    onClick={() => handleShowLess(index)}
                    className=" text-black font-bold py-1 px-2 rounded-full"
                  >
                    Show Less
                  </button>
                ) : (
                  <button
                    onClick={() => handleShowMore(index)}
                    className=" text-black font-bold py-1 px-2 rounded-full"
                  >
                    Show More
                  </button>
                )}
              </p>
            </div>
          </ResizableBox>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center">
          <div className="bg-white p-5 rounded-2xl mt-10 w-96 border border-gray-700 h-72 ">
            <h3 className="font-bold text-2xl text-black text-center">
              Edit Card
            </h3>
            <input
              type="text"
              value={editedCard.title}
              onChange={(e) =>
                setEditedCard({ ...editedCard, title: e.target.value })
              }
              className="mt-5 w-full p-2 pl-3 text-sm text-gray-700 border border-black rounded-full"
            />
            <textarea
              value={editedCard.text}
              onChange={(e) =>
                setEditedCard({ ...editedCard, text: e.target.value })
              }
              className="mt-5 w-full p-2 pl-3 text-sm text-gray-700 border border-black rounded-xl"
            />
            <div className="flex justify-end mt-5">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-full mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Canvas;
