import React, { useEffect, useState, useRef } from "react";
import {
  LayoutDashboard,
  Dog,
  PlusCircle,
  MessageSquare,
  Heart,
  BarChart3,
  User,
  Settings,
  Search,
  HelpCircle,
  Video,
  Phone,
  MoreHorizontal,
  Paperclip,
  Image as ImageIcon,
  Send,
  Calendar,
  FileText,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import NotificationBell from "../Components/NotificationBell";
import {
  loadUnreadInquiries,
  incrementUnreadInquiries,
  incrementPetInquiries,
  resetUnreadInquiries,
} from "../utils/petStorage";
import Header from "../Components/Header";

const MessagingInterface = () => {
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [mobileContextOpen, setMobileContextOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(loadUnreadInquiries());

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Emily Cooper",
      text: "Hi Dr. Jenkins! I saw the listing for the Golden Retriever puppy and I'm very interested. Is he still available for a visit this weekend?",
      time: "10:24 AM",
      type: "incoming",
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const sync = () => setUnreadCount(loadUnreadInquiries());
    window.addEventListener("focus", sync);
    return () => window.removeEventListener("focus", sync);
  }, []);

  // 🔹 Real Chat Reply Logic
  const handleSend = () => {
    if (!message.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 1. Aapka message send hoga
    const myMessage = {
      id: Date.now(),
      sender: "Admin",
      text: message,
      time: currentTime,
      type: "outgoing",
    };

    setChatMessages((prev) => [...prev, myMessage]);
    setMessage("");

    // 2. Real chat feel dene ke liye auto-reply (1.5 sec delay)
    setTimeout(() => {
      const replies = [
        "That sounds great! What time works best for you?",
        "Okay, I'll check my schedule and let you know.",
        "Perfect! Looking forward to meeting the puppy.",
        "Thanks for the quick response, Dr. Jenkins!",
        "Is there anything specific I should bring for the visit?",
        "I have a few questions about the puppy's health and vaccinations.",
        "Can you tell me more about the puppy's temperament?",
        "Will there be an opportunity to meet the puppy's parents during the visit?",
        "How long is the visit expected to last?",
        "What is the cancellation policy for the visit?",
        "I am also interested in knowing about the puppy's diet and feeding schedule.",
        "I am Lozer and I am very interested in adopting a pet. Can you tell me more about the adoption process?",
      ];

      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const userReply = {
        id: Date.now() + 1,
        sender: "Emily Cooper",
        text: randomReply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "incoming",
      };

      setChatMessages((prev) => [...prev, userReply]);

      // Update unread counts for notifications
      incrementPetInquiries(1);
      const nextCount = incrementUnreadInquiries();
      setUnreadCount(nextCount);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBellClick = () => {
    setUnreadCount(resetUnreadInquiries());
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FD] text-slate-800 font-sans overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0">
        {/* <Header  */}
          <Header onClick={(e) => {e.target.value("")}} />

        <div className="flex-1 flex overflow-hidden">
          <section className="hidden md:flex w-80 bg-white border-r border-gray-100 flex-col">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Messages</h2>
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {unreadCount} New
                </span>
              </div>
              {/* <div className="flex gap-2 mb-6">
                <FilterTab label="All Chats" active />
                <FilterTab label="Inquiries" />
              </div> */}
            </div>
            <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
              {/* List mein hamesha latest message dikhega */}
              <ChatPreview
                active
                name="Emily Cooper"
                subject="Golden Retriever Inquiry"
                msg={chatMessages[chatMessages.length - 1].text}
                time={chatMessages[chatMessages.length - 1].time}
                unread={
                  chatMessages[chatMessages.length - 1].type === "incoming"
                }
              />
              <ChatPreview
                name="Marcus Bennett"
                subject="Frenchie Vaccination"
                msg="Thank you for certificates..."
                time="9:15 AM"
              />
            </div>
          </section>

          <section className="flex-1 flex flex-col bg-[#FDFDFF] min-w-0">
            <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100?u=emily"
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <h3 className="font-bold text-sm">Emily Cooper</h3>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tight">
                    Golden Retriever #422
                  </p>
                </div>
              </div>
  
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col custom-scrollbar">
              <div className="self-center">
                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 max-w-[85%] ${msg.type === "outgoing" ? "self-end flex-row-reverse" : ""}`}
                >
                  <img
                    src={
                      msg.type === "outgoing"
                        ? "https://i.pravatar.cc/100?u=admin"
                        : "https://i.pravatar.cc/100?u=emily"
                    }
                    className="w-8 h-8 rounded-full self-end mb-1"
                    alt=""
                  />
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative ${
                      msg.type === "outgoing"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-white border border-gray-100 text-slate-600 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1 opacity-60 ${msg.type === "outgoing" ? "text-right" : ""}`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
              <div className="bg-gray-50 rounded-2xl p-2 flex items-center gap-2 border border-gray-100 focus-within:border-indigo-200 transition-all">
                <button className="p-2 text-gray-400 hover:text-indigo-600 transition">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-none text-sm focus:ring-0 px-2"
                />
                <button
                  onClick={handleSend}
                  className={`p-2.5 rounded-xl transition shadow-md ${message.trim() ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-200 text-gray-400"}`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* Context Sidebar stays as is */}
          <section className="hidden lg:block w-72 bg-white border-l border-gray-100 p-6 overflow-y-auto shrink-0">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-6">
              Conversation Context
            </h4>
            {/* Info remains same */}
          </section>
        </div>
      </main>
    </div>
  );
};

// Sub-components
const FilterTab = ({ label, active = false }) => (
  <button
    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${active ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
  >
    {label}
  </button>
);

const ChatPreview = ({
  name,
  subject,
  msg,
  time,
  active = false,
  unread = false,
}) => (
  <div
    className={`p-4 rounded-2xl cursor-pointer border transition-all ${active ? "bg-white border-indigo-100 shadow-sm" : "border-transparent hover:bg-gray-50"}`}
  >
    <div className="flex items-center gap-3 mb-1">
      <img
        src={`https://i.pravatar.cc/100?u=${name}`}
        className="w-10 h-10 rounded-full"
        alt=""
      />
      <div className="flex-1 truncate">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold truncate text-slate-800">
            {name}
          </span>
          <span className="text-[9px] text-gray-400 font-bold">{time}</span>
        </div>
        <p className="text-[10px] text-indigo-600 font-bold truncate">
          {subject}
        </p>
      </div>
    </div>
    <p
      className={`text-[11px] line-clamp-1 ${unread ? "text-slate-900 font-medium" : "text-gray-500"}`}
    >
      {msg}
    </p>
  </div>
);

const IconButton = ({ icon }) => (
  <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-100">
    {icon}
  </button>
);

export default MessagingInterface;
