"use client";
import React, { useState } from "react";


function MainComponent() {
  const [segments, setSegments] = useState([]);
  const [conditions, setConditions] = useState([
    { field: "", operator: "", value: "" },
  ]);
  const [campaigns, setCampaigns] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addCondition = () => {
    setConditions([...conditions, { field: "", operator: "", value: "" }]);
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  const saveSegment = () => {
    setLoading(true);
    setTimeout(() => {
      const newSegment = {
        id: Date.now(),
        conditions,
        audienceSize: Math.floor(Math.random() * 1000),
        status: "Active",
        created: new Date().toLocaleDateString(),
        message: message || "Default campaign message",
      };
      setSegments([...segments, newSegment]);
      setConditions([{ field: "", operator: "", value: "" }]);
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  const sendCampaign = (segmentId) => {
    const segment = segments.find((s) => s.id === segmentId);
    const newCampaign = {
      id: Date.now(),
      segmentId,
      sent: Math.floor(segment.audienceSize * 0.9),
      failed: Math.floor(segment.audienceSize * 0.1),
      date: new Date().toLocaleDateString(),
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg p-4 mb-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <i className="fas fa-chart-line text-blue-500 text-2xl mr-2"></i>
            <h1 className="text-2xl font-bold font-roboto">Campaign Hub</h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <i className="fas fa-users text-3xl text-blue-500 mr-4"></i>
            <div>
              <h3 className="text-sm text-gray-500">Total Audience</h3>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <i className="fas fa-paper-plane text-3xl text-green-500 mr-4"></i>
            <div>
              <h3 className="text-sm text-gray-500">Active Campaigns</h3>
              <p className="text-2xl font-bold">{campaigns.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <i className="fas fa-chart-pie text-3xl text-purple-500 mr-4"></i>
            <div>
              <h3 className="text-sm text-gray-500">Segments Created</h3>
              <p className="text-2xl font-bold">{segments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 font-roboto">
            Create Audience Segment
          </h2>

          {conditions.map((condition, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
              <select
                className="border p-2 rounded"
                value={condition.field}
                onChange={(e) =>
                  handleConditionChange(index, "field", e.target.value)
                }
              >
                <option value="">Select Field</option>
                <option value="spending">Total Spending</option>
                <option value="visits">Number of Visits</option>
                <option value="lastVisit">Last Visit</option>
              </select>
              <select
                className="border p-2 rounded"
                value={condition.operator}
                onChange={(e) =>
                  handleConditionChange(index, "operator", e.target.value)
                }
              >
                <option value="">Select Operator</option>
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value="=">=</option>
              </select>
              <input
                type="text"
                className="border p-2 rounded flex-1"
                placeholder="Value"
                value={condition.value}
                onChange={(e) =>
                  handleConditionChange(index, "value", e.target.value)
                }
              />
              <button
                onClick={() => removeCondition(index)}
                className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <div className="flex gap-4">
            <button
              onClick={addCondition}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Add Condition
            </button>
            <button
              onClick={saveSegment}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Segment
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6 font-roboto flex items-center">
            <i className="fas fa-history text-gray-500 mr-2"></i>
            Campaign History
          </h2>
          {segments.map((segment) => {
            const campaign = campaigns.find((c) => c.segmentId === segment.id);
            return (
              <div key={segment.id} className="border-b py-4 last:border-b-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold flex items-center">
                      <span className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded mr-2">
                        Segment #{segment.id}
                      </span>
                      <span
                        className={`text-sm ${
                          segment.status === "Active"
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                      >
                        {segment.status}
                      </span>
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Created: {segment.created}
                    </p>
                    <p className="text-gray-600">
                      Audience Size: {segment.audienceSize}
                    </p>
                    {campaign && (
                      <div className="mt-2 text-sm">
                        <p className="text-green-600">Sent: {campaign.sent}</p>
                        <p className="text-red-600">
                          Failed: {campaign.failed}
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => sendCampaign(segment.id)}
                    disabled={campaign}
                    className={`${
                      campaign
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    } px-4 py-2 rounded flex items-center gap-2`}
                  >
                    <i className="fas fa-paper-plane"></i>
                    {campaign ? "Campaign Sent" : "Send Campaign"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;