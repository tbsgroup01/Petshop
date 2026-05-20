import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MessageCircle, User, Clock, AlertCircle, Send, Paperclip, Smile, Link as LinkIcon, Archive } from 'lucide-react';

export default function TicketManagement() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: 'Booking Issue - Vet Consultation',
      ticketId: '#TKT-904',
      author: 'Ananya S.',
      // avatar: '👩',
      status: 'OPEN',
      priority: 'HIGH',
      createdTime: '10:45 AM',
      createdDate: 'Today',
      // description: "Hi team, I've been trying to book a vet consultation for my dog 'Buddy' for the last hour, but every time I get to the checkout page, it shows an error: 'ERR_BOOKING_004'. I've tried multiple cards. Can you help?",
      messages: [
        {
          id: 1,
          author: "Ananya S.",
          // avatar: "👩",
          content:
            "Hi team, I've been trying to book a vet consultation for my dog 'Buddy' for the last hour, but every time I get to the checkout page, it shows an error: 'ERR_BOOKING_004'. I've tried multiple cards. Can you help?",
          timestamp: "10:45 AM",
          type: "user",
        },
        {
          id: 2,
          author: 'Support Team',
          avatar: '🤖',
          content: "Hello Ananya, I'm sorry to hear you're experiencing this issue. I'm checking our payment logs now. Could you please confirm if you're using the mobile app or our website?",
          timestamp: '10:52 AM',
          type: 'support'
        },
        {
          id: 3,
          author: 'Internal Note',
          avatar: '📝',
          content: 'Checked server logs for user ID #AN_921. There was a temporary stripe gateway timeout at 10:40 AM. Should be resolved now. Escalate to billing if not resolved.',
          timestamp: 'Internal',
          type: 'internal'
        }
      ],
      assignedAgent: 'John Smith',
      assignedAgentAvatar: '👨',
      draftResponse: 'Write a message to Ananya...',
      draftSaved: true,
      draftTime: '10:20 AM'
    },
    {
      id: 2,
      title: 'Payment Failed',
      ticketId: '#TKT-903',
      author: 'Raj K.',
      avatar: '👨',
      status: 'PROGRESS',
      priority: 'MEDIUM',
      createdTime: '08:30 AM',
      createdDate: 'Today',
      // description: 'I tried to pay for the premium food bundle but my card was declined.',
      messages: []
    },
    {
      id: 3,
      title: 'Reschedule Walk',
      ticketId: '#TKT-902',
      author: 'Priya M.',
      avatar: '👩',
      status: 'CLOSED',
      priority: 'LOW',
      createdTime: '9:15 AM',
      createdDate: 'Yesterday',
      // description: 'Can I change my 10 AM walk to 6 PM?',
      messages: []
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [messageInput, setMessageInput] = useState('');
  const [responseType, setResponseType] = useState('reply');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [selectedTicket.messages, selectedTicket.id]);

  const emojiOptions = ['😊', '😂', '❤️', '👍', '🙌', '😢', '🎉', '🐶', '🐾'];
  const autoReplies = [
    "Thanks for the update! I'm checking it now and will get back to you shortly.",
    "I’ve escalated this to the technical team and they’ll review it within a few minutes.",
    "Thanks for reporting this. I’m validating the details and will update you soon.",
    "I see the issue on our end. I’m working on a fix and will confirm as soon as possible.",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'bg-green-100 text-green-700';
      case 'PROGRESS':
        return 'bg-blue-100 text-blue-700';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-600 bg-red-50';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50';
      case 'LOW':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const addAutoReply = (ticketId) => {
    const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    setTimeout(() => {
      setTickets((current) =>
        current.map((ticket) => {
          if (ticket.id !== ticketId) return ticket;
          const autoMessage = {
            id: Date.now() + 1,
            author: 'Support Bot',
            avatar: '🤖',
            content: reply,
            timestamp: new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }),
            type: 'support'
          };
          return {
            ...ticket,
            messages: [...ticket.messages, autoMessage]
          };
        })
      );
      setSelectedTicket((current) =>
        current.id === ticketId
          ? {
            ...current,
            messages: [
              ...current.messages,
              {
                id: Date.now() + 2,
                author: 'Support Bot',
                avatar: '🤖',
                content: reply,
                timestamp: new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }),
                type: 'support'
              }
            ]
          }
          : current
      );
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const newMessage = {
      id: Date.now(),
      author: 'You',
      avatar: '👤',
      content: messageInput,
      timestamp,
      type: responseType === 'internal' ? 'internal' : 'user'
    };

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? { ...ticket, messages: [...ticket.messages, newMessage] }
        : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket({ ...selectedTicket, messages: [...selectedTicket.messages, newMessage] });
    setMessageInput('');
    setShowEmojiPicker(false);

    if (responseType !== 'internal') {
      addAutoReply(selectedTicket.id);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const filteredTickets = filterStatus === 'all'
    ? tickets
    : tickets.filter((t) => t.status === filterStatus);

  const getAvatarLabel = (item) => {
    const name = item?.author || 'User';
    const initials = name
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join('')
      .replace(/[^a-z]/gi, '')
      .slice(0, 2)
      .toUpperCase();

    return initials || 'U';
  };

  return (
    <div className="min-h-screen lg:h-screen bg-gray-50 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
      {/* Sidebar - Tickets List */}
      <div className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 max-h-[38vh] lg:max-h-none lg:h-full flex flex-col min-h-0 shrink-0">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 z-10 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Tickets</h2>
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="p-1 hover:bg-gray-100 rounded-lg transition"
              title="Filter"
            >
              <ChevronDown size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Filter Menu */}
          {showFilterMenu && (
            <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition ${filterStatus === 'all'
                    ? 'bg-purple-100 text-[#4d41df] font-medium'
                    : 'hover:bg-gray-100'
                  }`}
              >
                All Tickets
              </button>
              <button
                onClick={() => {
                  setFilterStatus('OPEN');
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm border-t border-gray-200 transition ${filterStatus === 'OPEN'
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'hover:bg-gray-100'
                  }`}
              >
                Open
              </button>
              <button
                onClick={() => {
                  setFilterStatus('PROGRESS');
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm border-t border-gray-200 transition ${filterStatus === 'PROGRESS'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'hover:bg-gray-100'
                  }`}
              >
                In Progress
              </button>
              <button
                onClick={() => {
                  setFilterStatus('CLOSED');
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm border-t border-gray-200 transition ${filterStatus === 'CLOSED'
                    ? 'bg-gray-200 text-gray-700 font-medium'
                    : 'hover:bg-gray-100'
                  }`}
              >
                Closed
              </button>
            </div>
          )}
        </div>

        {/* Tickets List */}
        <div className="divide-y divide-gray-100 flex-1 overflow-y-auto min-h-0">
          {filteredTickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className={`w-full text-left p-3 sm:p-4 transition ${selectedTicket.id === ticket.id
                  ? 'bg-purple-50 border-l-4 border-[#4d41df]'
                  : 'hover:bg-gray-50'
                }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4d41df] text-xs font-bold text-white">
                  {getAvatarLabel(ticket)}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {ticket.title}
                  </h3>
                  {/* <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {ticket.description}
                  </p> */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(ticket.status)}`}>
                      {ticket.status === 'PROGRESS' ? 'IN PROGRESS' : ticket.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{ticket.createdTime}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white min-h-0 lg:h-full overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-3 sm:p-4 md:p-6 bg-white sticky top-0 z-10 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex-1">
            <div className="min-w-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 mb-2">
                <h1 className="min-w-0 text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
                  {selectedTicket.title}
                </h1>
                <span className={`w-fit shrink-0 text-xs font-bold px-3 py-1 rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                  {selectedTicket.priority} PRIORITY
                </span>
              </div>
              <p className="text-sm text-gray-600">{selectedTicket.ticketId} • Ananya S.</p>
              <p className="text-xs text-gray-500 mt-1">Status: {selectedTicket.status === 'PROGRESS' ? 'In Progress' : selectedTicket.status} • {selectedTicket.createdDate}</p>
            </div>
            {/* <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="Assign Agent">
                <User size={18} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="View Details">
                <Archive size={18} className="text-gray-600" />
              </button>
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:shrink-0">
            <button className="flex items-center justify-center gap-2 px-3 py-2 md:py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
              <span>Assign Agent</span>
              <span className="text-xs">→</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 md:py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
              <span>View User Details</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>

        {/* Conversation */}
        <div ref={conversationRef} className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 min-h-0">
          {/* Initial Message */}
          <div className="flex gap-2 sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4d41df] text-xs font-bold text-white">
              {getAvatarLabel(selectedTicket)}
            </span>
            <div className="flex-1">
              {/* <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-900">{selectedTicket.description}</p>
              </div> */}
              <p className="text-xs text-gray-500 mt-2">{selectedTicket.createdTime}</p>
            </div>
          </div>

          {/* Messages */}
          {selectedTicket.messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.type === 'internal' ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-yellow-700 uppercase tracking-wide">Internal Note</span>
                  </div>
                  <p className="text-sm text-gray-900">{message.content}</p>
                </div>
              ) : (
                <div className={`flex gap-2 sm:gap-3 ${message.type === 'support' ? 'justify-start' : 'justify-end'}`}>
                  {message.type === 'support' && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4d41df] text-xs font-bold text-white">
                      {getAvatarLabel(message)}
                    </span>
                  )}
                  <div className={`max-w-[82%] sm:max-w-[75%] lg:max-w-[68%] ${message.type === 'support' ? 'bg-[#4d41df] text-white' : 'bg-white border border-gray-200 text-gray-900'} rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`mt-2 text-xs ${message.type === 'support' ? 'text-blue-100' : 'text-gray-500'} text-right`}>{message.timestamp}</p>
                  </div>
                  {message.type !== 'support' && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                      {getAvatarLabel(message)}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Response Section */}
        <div className="border-t border-gray-200 p-3 sm:p-4 md:p-6 bg-gray-50 shrink-0">
          {/* Response Type Tabs */}
          <div className="flex gap-2 mb-4 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setResponseType('reply')}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition ${responseType === 'reply'
                  ? 'border-b-2 border-[#4d41df] text-[#4d41df]'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Reply
            </button>
            <button
              onClick={() => setResponseType('internal')}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition ${responseType === 'internal'
                  ? 'border-b-2 border-[#4d41df] text-[#4d41df]'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Internal Note
            </button>
          </div>

          {/* Message Input */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-visible mb-4">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message to Ananya..."
              className="w-full px-4 py-3 text-sm border-0 focus:outline-none resize-none"
              rows="4"
            />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 gap-3">
              <div className="flex items-center gap-2 relative">
                <button type="button" className="p-2 hover:bg-gray-200 rounded-lg transition" title="Attach file">
                  <Paperclip size={18} className="text-gray-600" />
                </button>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((open) => !open)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                    title="Add emoji"
                  >
                    <Smile size={18} className="text-gray-600" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute left-0 top-full mt-2 w-40 rounded-2xl bg-white border border-gray-200 shadow-lg p-3 grid grid-cols-5 gap-2 z-50">
                      {emojiOptions.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleEmojiClick(emoji)}
                          className="text-lg p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
             
              </div>

            </div>
          </div>

          {/* Draft Status and Send Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="truncate">Draft saved at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className={`flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition sm:w-auto ${messageInput.trim()
                  ? 'bg-[#4d41df] text-white hover:bg-[#4d41df]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <span>Send Response</span>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>

    );
  };
